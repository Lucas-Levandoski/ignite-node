import { AppError } from '@errors/AppError';
import { ICreateUserDTO } from '@modules/accounts/dtos/ICreateUserDTO';
import { UsersRepositoryInMemory } from '@modules/accounts/repositories/inMemory/UsersRepositoryInMemory';
import { CreateUserUseCase } from '@modules/accounts/useCases/createUser/CreateUserUseCase';
import { AuthenticateUserUseCase } from './AuthenticateUserUseCase';



let usersRepositoryInMemory: UsersRepositoryInMemory;
let authenticateUserUseCase: AuthenticateUserUseCase;
let createUserUseCase: CreateUserUseCase;

describe('authenticate user use case', () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    authenticateUserUseCase = new AuthenticateUserUseCase(usersRepositoryInMemory);
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
  });

  it('should be able to authenticate a user', async () => {
    const user: ICreateUserDTO = {
      driverLicense: 'test',
      email: 'test@test',
      password: '1234',
      name: 'user test'
    };

    await createUserUseCase.execute(user);

    const result = await authenticateUserUseCase.execute({ email: user.email, password: user.password });

    expect(result).toHaveProperty('token');
  });

  it('should be able to authenticate a invalid user', async () => {
    const user: ICreateUserDTO = {
      driverLicense: 'test',
      email: 'test@test',
      password: '1234',
      name: 'user test'
    };

    await createUserUseCase.execute(user);

    expect(async () => {

      const result = await authenticateUserUseCase.execute({ email: 'test', password: user.password });

      expect(result).toHaveProperty('token');
    }).rejects.toBeInstanceOf(AppError);

  });


  it('should be able to authenticate a invalid password', async () => {
    const user: ICreateUserDTO = {
      driverLicense: 'test',
      email: 'test@test',
      password: '1234',
      name: 'user test'
    };

    await createUserUseCase.execute(user);

    expect(async () => {

      const result = await authenticateUserUseCase.execute({ email: user.email, password: 'test' });

      expect(result).toHaveProperty('token');
    }).rejects.toBeInstanceOf(AppError);
  });

});