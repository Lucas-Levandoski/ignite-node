import { ICreateCarDTO } from '../dtos/ICreateCarDTO';
import { IFindCarDTO } from '../dtos/IFindCarDTO';
import { Car } from '../infra/typeorm/entities/Car';

export interface ICarsRepository {
  create(data: ICreateCarDTO): Promise<Car>;
  findByName(name: string): Promise<Car>;
  findByLicensePlate(plate: string): Promise<Car | undefined>;
  findAll(data?: IFindCarDTO): Promise<Car[]>;
}