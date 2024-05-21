/* import { createServer } from 'node:http'

const server = createServer((request, response) => {
  console.log('oi')
  response.write('Hello World com Node Js')
  return response.end()
})

server.listen(3333) */

import { fastify } from "fastify";
//import dataBase from './dataBase.js'
import DataBasePostgres from "./dataBase-pOstgres.js";

const server = fastify()
//const data = new dataBase()
const data = new DataBasePostgres()

server.get('/cars', async (request, reply) => {
  const cars = await data.list(request.query.search)

  return cars
})

server.post('/cars', async (request, reply) => {
  const { name, year, price } = request.body

  await data.create({
    name,
    year,
    price
  })

  return reply.status(201).send(request.body)
})

server.put('/cars/:id', async (request, reply) => {
  const carId = request.params.id
  const { name, year, price } = request.body

  await data.update(carId, {
    name,
    year,
    price
  }) 

  return reply.status(204).send
})

server.delete('/cars/:id', async (request, reply) => {
  const videoId = request.params.id

  await data.delete(videoId)

  return reply.status(204).send
})

server.listen({
  port: 7777
})