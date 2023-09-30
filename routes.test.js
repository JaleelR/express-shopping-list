
process.env.NODE_ENV = "test";
const items = require("./fakeDb");
const ExpressError = require("./ExpressError");
const app = require("./app")
//no "s" with supertests
const request = require("supertest");
const itemRoutes = require("./routes");



let pie = {
    name: "strawberry creme",
    price: "100.99"
};

let mossWall = {
    name: "mossWall",
    price: "39.99"
};


beforeEach(function () {
    items.push(pie)
})


afterEach(function () {
    items.length = 0;
})



describe("Get all items", () => {
    test("GET /items", async () => {
        const res = await request(app).get("/items")
        expect(res.statusCode).toBe(200)
        expect(res.body).toEqual({ items })
    })
})


describe("testing posts requets", () => {
    test("POST /items", async () => {
        const res = await request(app).post("/items").send( mossWall)

    expect(res.statusCode).toBe(201)
    expect(res.body).toEqual({added: mossWall })
})
})

describe("testing getting item by name", () => {
    test("GET /items/:name", async () => {
        const res = await request(app).get(`/items/${pie.name}`)
        expect(res.statusCode).toBe(200)
        expect(res.body).toEqual({ itemFound: pie })

    })
})


describe("test patch", () => {
    test("PATCH /items/:name", async () => {
        const res = await request(app).patch(`/items/${pie.name}`).send({ name: "strawberryCreme Pie",  price: 4.99})
        expect(res.statusCode).toBe(200)
        expect(res.body).toEqual({ updated: pie })
    })
})

describe("delete pie", () => {
    test("delete items /: name", async () => {
        const res = await request(app).delete(`/items/${pie.name}`)
        expect(res.statusCode).toBe(400)
        expect(res.body).toEqual({ message: "Deleted" })
    })
})