// import request from 'supertest'
// import app from '../../server.js'
// import dotenv from 'dotenv'
// import { dummyRecipe1, dummyRecipe2 } from '../../utils/recipe.test.data.js'

// dotenv.config()

// let recipeId = " "

// describe('test', () => {
//     it('first test', () => {
//         expect(true).toBe(true)
//     })
// })
// describe("POST /recipes", () => {
//     it("should create a recipe", async () => {
//         return request(app)
//             .post("/recipes")
//             .send(dummyRecipe1)
//             .expect(201)
//             .then(({body})=>{
//             recipeId = body._id
//             })
//     });
// });

// describe("GET /recipes", () => {
//     it("should return all recipes", async() => {
//         return request(app)
//             .get('/recipes')
//             .expect('Content-Type', /json/)
//             .expect(200)
//             .then((res) => {
//                 expect(res.statusCode).toBe(200)
//             })
//     })
// })


// describe("PUT recipes/:id", () => {
//     it("should update a product", async () => {
//         return request(app)
//             .put(`/recipes/${recipeId}`)
//             .send(dummyRecipe2)
//             .expect(201)
//             .then(({body})=>
//             {
//                 console.log(recipeId)
//             })
//     });
// });

// describe("DELETE recipes/:id", () => {
//     it("should create a product", async () => {
//         return request(app)
//             .delete(`/recipes/${recipeId}`)
//             .expect(410)
//     });
// });