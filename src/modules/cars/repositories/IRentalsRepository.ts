import { ICreateRentalDTO } from '../dtos/ICreateRentalDTO';
import { Rental } from '../infra/typeorm/entities/Rental';


export interface IRentalsRepository {
  create(data: ICreateRentalDTO): Promise<void>;
  findOpenRentalByCar(carId: string): Promise<Rental | null>;
}