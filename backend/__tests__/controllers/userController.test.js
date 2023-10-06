import request from 'supertest'
import jwt from 'jsonwebtoken'
import mongoose from 'mongoose'
import app from '../../server.js'
import User from '../../models/User.js'

beforeEach( async () => {await User.deleteMany()})

test('Should register a user', async () => {
    const response = await request(app).post('/users').send({
        name: 'tom',email:"tom@gmail.com",password:"tom123"}).expect(201)
        // console.log(response.body);
    
        //Assert that the database was changed correctly
        const user = await User.findById(response.body._id)
        console.log(response.body)
        expect(response.body).toMatchObject({
            
                user:{name: 'tom', _id: user._id, email:"tom@gmail.com"},
                
            })
            expect(user.password).not.toBe('tom123')})