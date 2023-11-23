import { app } from "../src/app.js";
import { faker } from "@faker-js/faker";
import chai from "chai";
import supertest from "supertest";

const expect = chai.expect;
const requester = supertest(app) // elemento para hacer peticiones al servidor


describe("Testing de  tienda_online", () => {
    describe('Testing router session', () => {
        // this.timeout(10000);
        it('Endpoint POST de api/sessions/signup - Registrar un usuario', 
        async ()=>{
            const person = {
                first_name: "Andrea",
                last_name: "Perez",
                email: "andreaperez@coder.com",
                password: "coder123"

                // first_name: faker.person.firstName(),
                // last_name: faker.person.lastName(),
                // email: faker.internet.email(),
                // age: faker.string.numeric({length:2}),
                // password: faker.string.alphanumeric({length:10})
            };
            const response = await requester.post('/api/sessions/signup').send(person);
            //console.log(response)
            const { text } = response
            expect(text).to.be.equal('Found. Redirecting to /sessions/login')
            expect(response.body.status).to.be.equal("success");
            expect(response.body.data).to.have.property("_id");
        })

        it('Endpoint POST de api/session/signup - No se debe registrar si se repite el usuario', async () => {
            const person = {
                first_name: "Andrea",
                last_name: "Perez",
                email: "andreaperez@coder.com",
                password: "coder123"
            }
            // const person = {
            //     first_name: faker.person.firstName(),
            //     last_name: faker.person.lastName(),
            //     email: "arturoguerraba@gmail.com",
            //     age: faker.string.numeric({length:2}),
            //     password: faker.string.alphanumeric({length:10})                
            // }
            const response = await requester.post('/api/session/signup').send(person)
            const { text } = response
            expect(text).to.be.eq('Found. Redirecting to /api/sessions/fail-signup')
        })
    })


    describe('Testing router product', () => {
        it('Endpoint POST de api/products - Funcion para la creacion de productos',
         async ()=>{
            const product = {
                title: " cafetera",
                description: "cafetera electrica prueba test",
                price: 50000,
                code:"12345",
                category: "electro",
                stock:10,
            };
            const response = await requester.post('/api/products').send(product);
             console.log(response);
              expect(response.body.data).to.have.property("title")
              expect(response.body.data.title).to.be.equal(product.title);
        })


        it('Endpoint GET de api/products - Funcion de la paginacion de productos', async () => {
            const response = await requester.get('/api/products')
            const { _body } = response
            expect(_body.status).to.be.eq('success')
        })

        it('Endpoint GET de api/products - Traer producto por su id', async () => {
            const response = await requester.get('/api/products/6551dbf68f3e8c32e7be76dd')
            const { _body } = response
            expect(_body.status).to.be.eq('success')

        })

    })


    describe('Testing router carts', () => {
        it('Endpoint POST de api/carts - Funcion para la creacion de un carrito', async () => {
            const response = await requester.post('/api/carts')
            const { _body } = response
            // expect(_body.status).to.be.equal('success')

        })

        it('Endpoint GET de api/carts - traer carrito por su ID', async () => {
            const response = await requester.get('/api/carts/64ec19491a23f8305b81e93e')
            const { _body } = response

            // expect(_body.status).to.be.eq('success')

        })

    })
})