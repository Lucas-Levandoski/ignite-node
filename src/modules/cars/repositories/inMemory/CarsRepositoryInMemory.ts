import { Car } from '@modules/cars/infra/typeorm/entities/Car';
import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';
import { ICreateCarDTO } from '@modules/cars/dtos/ICreateCarDTO';


export class CarsRepositoryInMemory implements ICarsRepository {

  cars: Car[] = [];

  async create(data: ICreateCarDTO): Promise<void> {
    const car = new Car();

    Object.assign(car, data);

    this.cars.push(car);

    return;
  }

  async findByName(name: string): Promise<Car> {
    return new Car();
  }
}