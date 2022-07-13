import { Car } from '@modules/cars/infra/typeorm/entities/Car';
import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';
import { ICreateCarDTO } from '@modules/cars/dtos/ICreateCarDTO';
import { IFindCarDTO } from '@modules/cars/dtos/IFindCarDTO';


export class CarsRepositoryInMemory implements ICarsRepository {

  cars: Car[] = [];

  async create(data: ICreateCarDTO): Promise<Car> {
    const car = new Car();

    Object.assign(car, data);

    this.cars.push(car);

    return car;
  }

  async findByName(name: string): Promise<Car> {
    return new Car();
  }

  async findByLicensePlate(plate: string): Promise<Car | undefined> {
    return this.cars.find(car => car.licensePlate === plate);
  }

  async findAll({ brand, categoryId, dailyRate, fineAmount, name }: IFindCarDTO): Promise<Car[]> {
    return this.cars.filter(car => {
      if (!car.available)
        return false;
      if (brand ? !(car.brand === brand) : true)
        return false;
      if (categoryId ? !(car.categoryId === categoryId) : true)
        return false;
      if (dailyRate ? !(car.dailyRate === dailyRate) : true)
        return false;
      if (fineAmount ? !(car.fineAmount === fineAmount) : true)
        return false;
      if (name ? !(car.name === name) : true)
        return false;

      return true;
    });
  }
}