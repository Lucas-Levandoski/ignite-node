import { CarsImage } from '../infra/typeorm/entities/CarsImage';

export interface ICarsImageRepository {
  create(carId: string, imageName: string): Promise<CarsImage>;
}