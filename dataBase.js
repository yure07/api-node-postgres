import { randomUUID } from 'node:crypto'

class DataBase{
  #cars = new Map()

  list(search){
    return Array.from(this.#cars.entries())
      .map((carArr) => {
        const carId = carArr[0]
        const dataCar = carArr[1]

        return {
          id: carId,
          ...dataCar
        }
      })
      .filter((car) => {
        if(search) {
          return car.name.includes(search)
        }
        return true
      })
  }

  create(car){
    const carId = randomUUID()

    this.#cars.set(carId, car)
  }

  update(id, car){
    this.#cars.set(id, car)
  }

  delete(id){
    this.#cars.delete(id)
  }
}

export default DataBase