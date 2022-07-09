import { ICreateCarDTO } from '@modules/cars/dtos/ICreateCarDTO';
import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';
import { Car } from '../entities/Car';


export class CarsRepository implements ICarsRepository {
  create(data: ICreateCarDTO): Promise<void> {
    throw new Error();
  }

  findByName(name: string): Promise<Car> {
    throw new Error();
  }
}