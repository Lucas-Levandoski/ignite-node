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
      licensePlate: 123
    });
  });
});