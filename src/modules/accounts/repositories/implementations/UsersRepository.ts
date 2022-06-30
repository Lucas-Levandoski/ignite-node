import { Repository } from 'typeorm';
import PostgresDataSource from '../../../../database';
import { ICreateUserDTO } from '../../dtos/ICreateUserDTO';
import { User } from '../../entities/User';
import { IUsersRepository } from '../IUsersRepository';


export class UsersRepository implements IUsersRepository {

  private repository: Repository<User>;

  constructor() {
    this.repository = PostgresDataSource.getRepository(User);
  }

  async create({ name, username, email, driverLicense, password }: ICreateUserDTO): Promise<void> {
    const user = this.repository.create({
      name, username, email, driverLicense, password
    });

    await this.repository.save(user);
  }
}