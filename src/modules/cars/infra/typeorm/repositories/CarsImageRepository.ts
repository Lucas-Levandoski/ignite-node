import PostgresDataSource from '@database/index';
import { ICarsImageRepository } from '@modules/cars/repositories/ICarsImageRepository';
import { Repository } from 'typeorm';
import { CarsImage } from '../entities/CarsImage';


export class CarsImageRepository implements ICarsImageRepository {

  private repository: Repository<CarsImage>;

  constructor() {
    this.repository = PostgresDataSource.getRepository(CarsImage);
  }

  async create(carId: string, imageName: string): Promise<CarsImage> {
    const carsImage = this.repository.create({ carId, imageName });

    await this.repository.save(carsImage);

    return carsImage;
  }
}