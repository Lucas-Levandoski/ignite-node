import { ICreateCarDTO } from '../dtos/ICreateCarDTO';
import { ICreateCarSpecificationDTO } from '../dtos/ICreateCarSpecificationDTO';
import { IFindCarDTO } from '../dtos/IFindCarDTO';
import { Car } from '../infra/typeorm/entities/Car';

export interface ICarsRepository {
  create(data: ICreateCarDTO): Promise<Car>;
  findByName(name: string): Promise<Car | undefined>;
  findByLicensePlate(plate: string): Promise<Car | undefined>;
  findAll(data?: IFindCarDTO): Promise<Car[]>;
  findById(carId: string): Promise<Car | undefined>;
}