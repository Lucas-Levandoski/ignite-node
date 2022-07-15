import PostgresDataSource from '@database/index';
import { ICreateCarDTO } from '@modules/cars/dtos/ICreateCarDTO';
import { IFindCarDTO } from '@modules/cars/dtos/IFindCarDTO';
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

    console.log(car.specifications[0].name);

    await this.repository.save(car);

    return car;
  }

  async findByName(name: string): Promise<Car | undefined> {
    return await this.repository.findOne({ where: { name } }) ?? undefined;
  }

  async findByLicensePlate(plate: string): Promise<Car | undefined> {
    return await this.repository.findOne({ where: { licensePlate: plate } }) ?? undefined;
  }

  async findById(carId: string): Promise<Car | undefined> {
    return await this.repository.findOne({ where: { id: carId } }) ?? undefined;
  }

  async findAll({ brand, categoryId, dailyRate, fineAmount, name }: IFindCarDTO = {}): Promise<Car[]> {
    const carsQuery = this.repository
      .createQueryBuilder('c')
      .where('available = true')
      .leftJoinAndSelect('c.specifications', 'specifications');

    if (brand) carsQuery.andWhere(`c.brand = '${brand}'`);

    if (categoryId) carsQuery.andWhere(`c.categoryId = '${categoryId}'`);

    if (dailyRate) carsQuery.andWhere(`c.dailyRate = ${dailyRate}`);

    if (fineAmount) carsQuery.andWhere(`c.name = '${name}'`);

    const cars = await carsQuery.getMany();

    return cars;
  }
}