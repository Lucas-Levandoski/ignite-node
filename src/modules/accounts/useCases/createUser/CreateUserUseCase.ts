import { inject, injectable } from 'tsyringe';
import { AppError } from '@errors/AppError';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';

interface IRequest {
  name: string;
  password: string;
  email: string;
  driverLicense: string;
}

@injectable()
export class CreateUserUseCase {

  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) { }

  async execute(data: IRequest): Promise<void> {
    const user = await this.usersRepository.findByEmail(data.email);

    if (user)
      throw new AppError('email already registered by another user', 404);

    return await this.usersRepository.create(data);
  }
}