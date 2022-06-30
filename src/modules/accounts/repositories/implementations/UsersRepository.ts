import { Repository } from 'typeorm';
import PostgresDataSource from '../../../../database';
import { ICreateUserDTO } from '../../dtos/ICreateUserDTO';
import { User } from '../../entities/User';
import { IUsersRepository } from '../IUsersRepository';
import { hash } from 'bcryptjs';


export class UsersRepository implements IUsersRepository {

  private repository: Repository<User>;

  constructor() {
    this.repository = PostgresDataSource.getRepository(User);
  }

  async create({ name, email, driverLicense, password }: ICreateUserDTO): Promise<void> {
    const passwordHash = await hash(password, 5);


    const user = this.repository.create({
      name, email, driverLicense, password: passwordHash
    });

    await this.repository.save(user);
  }

  async findByEmail(email: string): Promise<User | null> {
    return await this.repository.findOne({ where: { email } });
  }
}