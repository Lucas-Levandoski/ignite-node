import PostgresDataSource from '@database/index';
import { ICreateRentalDTO } from '@modules/cars/dtos/ICreateRentalDTO';
import { IRentalsRepository } from '@modules/cars/repositories/IRentalsRepository';
import { LessThan, Repository } from 'typeorm';
import { Rental } from '../entities/Rental';


export class RentalsRepository implements IRentalsRepository {
  private repository: Repository<Rental>;

  constructor() {
    this.repository = PostgresDataSource.getRepository(Rental);
  }


  async create(data: ICreateRentalDTO): Promise<void> {
    const rental = this.repository.create(data);

    await this.repository.save(rental);
  }

  async findOpenRentalByCar(carId: string): Promise<Rental | null> {
    return await this.repository.findOne({ where: { carId, endDate: LessThan(new Date()) } });
  }
}