import { randomUUID } from 'node:crypto'
import { sql } from './db.js'

export class DataBasePostgres{
  async list(seacrh){
    let cars
    
    if(seacrh){
      cars = await sql`select * from cars where name ilike ${'%' + seacrh + '%'}`
    } else {
      cars = await sql`select * from cars`
    }

    return cars
  }

  async create(car){
    const carId = randomUUID()
    const { name, year, price } = car

    await sql`insert into cars (id, name, year, price) VALUES (${carId}, ${name}, ${year}, ${price})`
  }

  async update(id, car){
    const { name, year, price } = car

    await sql`update cars set name = ${name}, year = ${year}, price = ${price} WHERE id = ${id}`
      .then(() => {
        console.log('carro atualizado!')
      })
      .catch((err) => {
        console.log(`erro: ${err}`)
      })
  }

  async delete(id){
    await sql`delete from cars where id = ${id}`
      .then(() => {
        console.log('carro deletado!')
      })
      .catch((err) => {
        console.log(`erro: ${err}`)
      })
  }
}

export default DataBasePostgres