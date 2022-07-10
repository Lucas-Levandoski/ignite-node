import { AppError } from '@errors/AppError';
import { CarsRepositoryInMemory } from '@modules/cars/repositories/inMemory/CarsRepositoryInMemory';
import { CreateCarUseCase } from './CreateCarUseCase';


let carsRepositoryInMemory: CarsRepositoryInMemory;
let createCarUseCase: CreateCarUseCase;

describe('Create car use case', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
  });

  it('should be able to create a new car', async () => {
    await createCarUseCase.execute({
      name: 'new car',
      description: 'new description',
      brand: 'new brand',
      categoryId: 'cateogryId',
      dailyRate: 123,
      fineAmount: 123,
      licensePlate: 'asf1234'
    });

    const car = await carsRepositoryInMemory.findByLicensePlate('asf1234');

    expect(car).toBeDefined();
  });

  it('should not be able to create a car with already registered license plate', async () => {
    const requestContent = {
      name: 'new car',
      description: 'new description',
      brand: 'new brand',
      categoryId: 'cateogryId',
      dailyRate: 123,
      fineAmount: 123,
      licensePlate: 'asf1234'
    };

    expect(async () => {
      await createCarUseCase.execute(requestContent);
      await createCarUseCase.execute(requestContent);
    }).rejects.toBeInstanceOf(AppError);
  });
});