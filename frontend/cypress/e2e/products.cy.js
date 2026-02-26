describe("Factory Manager - fluxo completo", () => {

    beforeEach(() => {
        cy.visit("http://localhost:5173");
    });

    // =====================
    // PRODUCTS
    // =====================
    it("cria produto", () => {
        cy.contains("Products").click();

        cy.get('input[placeholder="name"]').type("mesa");
        cy.get('input[placeholder*="value"]').type("150");

        cy.contains("Save").click();

        cy.contains("mesa").should("exist");
    });

    it("edita produto", () => {
        cy.contains("Products").click();

        cy.contains("Edit").first().click();

        cy.get('input[placeholder="name"]')
            .clear()
            .type("mesa premium");

        cy.contains("Update").click();

        cy.contains("mesa premium").should("exist");
    });

    it("deleta produto", () => {
        cy.contains("Products").click();

        cy.contains("Delete").first().click();

        cy.wait(500);
    });

    // =====================
    // MATERIALS
    // =====================
    it("cria material", () => {
        cy.contains("Materials").click();

        cy.get('input[placeholder="name"]').type("madeira");
        cy.get('input[placeholder*="stock"]').type("100");

        cy.contains("Save").click();

        cy.contains("madeira").should("exist");
    });

    it("edita material", () => {
        cy.contains("Materials").click();

        cy.contains("Edit").first().click();
        cy.contains("Update").click();

        cy.get('input[placeholder="name"]')
            .clear()
            .type("madeira tratada");

        cy.contains("Save").click();

        cy.contains("madeira tratada").should("exist");
    });

    it("deleta material", () => {
        cy.contains("Materials").click();

        cy.contains("Delete").first().click();

        cy.wait(500);
    });

    // =====================
    // LINK PRODUCT → MATERIAL
    // =====================
    it("cria link produto material", () => {
        cy.contains("Links").click();

        cy.get("select").first().select(1);
        cy.get("select").last().select(1);

        cy.get('input[placeholder*="quantity"]').type("2");

        cy.contains("Save").click();
    });

    // =====================
    // PRODUCTION
    // =====================
    it("abre produção", () => {
        cy.contains("Production").click();
        cy.get("body").should("contain", "Production");;
    });

});