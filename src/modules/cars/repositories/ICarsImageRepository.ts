import { CarsImage } from '../infra/typeorm/entities/CarsImage';

export interface ICarsImageRepository {
  create(carId: string, imageNames: string[]): Promise<void>;
}