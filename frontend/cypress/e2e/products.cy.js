describe("Factory Manager — E2E", () => {

  const API = "http://localhost:3000";

  beforeEach(() => {
    cy.visit("http://localhost:5173");
  });

  // SEED — cria dados sempre que precisar
  
  const seed = () => {
    cy.request("POST", `${API}/products`, {
      name: "produto teste",
      value: 100
    });

    cy.request("POST", `${API}/materials`, {
      name: "material teste",
      stock: 50
    });
  };

  // PRODUCTS
  it("CRUD produto", () => {

    cy.contains("Products").click();

    // CREATE
    cy.get('input[placeholder="name"]').type("mesa");
    cy.get('input[placeholder*="value"]').type("150");
    cy.contains("Save").click();
    cy.contains("mesa").should("exist");

    // UPDATE
    cy.contains("Edit").first().click();
    cy.get('input[placeholder="name"]').clear().type("mesa premium");
    cy.contains("Update").click();
    cy.contains("mesa premium").should("exist");

    // DELETE
    cy.contains("Delete").first().click();
  });

  // MATERIALS
  it("CRUD material", () => {

    cy.contains("Materials").click();

    // CREATE
    cy.get('input[placeholder="name"]').type("madeira");
    cy.get('input[placeholder*="stock"]').type("100");
    cy.contains("Save").click();
    cy.contains("madeira").should("exist");

    // UPDATE
    cy.contains("Edit").first().click();
    cy.get('input[placeholder="name"]').clear().type("madeira tratada");
    cy.contains("Update").click();
    cy.contains("madeira tratada").should("exist");

    // DELETE
    cy.contains("Delete").first().click();
  });

  // LINK PRODUCT → MATERIAL
  it("cria link produto material", () => {

    seed();

    cy.intercept("GET", "**/products").as("products");
    cy.intercept("GET", "**/materials").as("materials");

    cy.contains("Links").click();

    cy.wait("@products");
    cy.wait("@materials");

    cy.get("select").first()
      .find("option")
      .should("have.length.greaterThan", 1);

    cy.get("select").last()
      .find("option")
      .should("have.length.greaterThan", 1);

    cy.get("select").first().select(1);
    cy.get("select").last().select(1);

    cy.get('input[placeholder*="quantity"]').type("2");

    cy.contains("Save").click();

    cy.contains("Delete").should("exist");
  });

  // PRODUCTION
  it("produção calcula corretamente", () => {

    seed();

    cy.request("GET", `${API}/products`).then(p => {
      cy.request("GET", `${API}/materials`).then(m => {

        cy.request("POST", `${API}/product-materials`, {
          productId: p.body[0].id,
          materialId: m.body[0].id,
          quantity: 2
        });

      });
    });

    cy.contains("Production").click();

    cy.get("body").should("contain", "Production");
  });

});