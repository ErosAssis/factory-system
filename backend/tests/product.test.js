const request = require("supertest");
const app = require("../app");

describe("Products API", () => {

  it("GET /products", async () => {
    const res = await request(app).get("/products");

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("POST /products", async () => {
    const res = await request(app)
      .post("/products")
      .send({ name: "ProdutoTeste", value: 50 });

    expect(res.statusCode).toBe(201);
    expect(res.body.name).toBe("ProdutoTeste");
  });

});