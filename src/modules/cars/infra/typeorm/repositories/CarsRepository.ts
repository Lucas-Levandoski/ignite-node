import { ICreateCarDTO } from '@modules/cars/dtos/ICreateCarDTO';
import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';


export class CarsRepository implements ICarsRepository {
  create(data: ICreateCarDTO): Promise<void> {
    throw new Error();
  }
}