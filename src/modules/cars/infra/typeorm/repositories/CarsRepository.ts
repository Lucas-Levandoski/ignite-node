import PostgresDataSource from '@database/index';
import { ICreateCarDTO } from '@modules/cars/dtos/ICreateCarDTO';
import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';
import { Repository } from 'typeorm';
import { Car } from '../entities/Car';


export class CarsRepository implements ICarsRepository {
  private repository: Repository<Car>;

  constructor() {
    this.repository = PostgresDataSource.getRepository(Car);
  }

  async create(data: ICreateCarDTO): Promise<Car> {
    const car = this.repository.create(data);

    await this.repository.save(car);

    return car;
  }

  findByName(name: string): Promise<Car> {
    throw new Error();
  }

  async findByLicensePlate(plate: string): Promise<Car | undefined> {
    return await this.repository.findOne({ where: { licensePlate: plate } }) ?? undefined;
  }

  async findAvailable(): Promise<Car[]> {
    return await this.repository.find({ where: { available: true } });
  }
}