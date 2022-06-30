import { inject, injectable } from 'tsyringe';
import { IUsersRepository } from '../../repositories/IUsersRepository';

interface IRequest {
  name: string;
  username: string;
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
    return await this.usersRepository.create(data);
  }
}