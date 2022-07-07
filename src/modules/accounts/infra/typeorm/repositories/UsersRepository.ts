import { Repository } from 'typeorm';
import PostgresDataSource from '@database/index';
import { ICreateUserDTO } from '@modules/accounts/dtos/ICreateUserDTO';
import { User } from '@modules/accounts/infra/typeorm/entities/User';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { hash } from 'bcryptjs';


export class UsersRepository implements IUsersRepository {

  private repository: Repository<User>;

  constructor() {
    this.repository = PostgresDataSource.getRepository(User);
  }

  async create({ id, name, email, driverLicense, password, avatar }: ICreateUserDTO): Promise<void> {
    const passwordHash = await hash(password, 5);

    const user = this.repository.create({
      id, name, email, driverLicense, avatar, password: passwordHash
    });

    await this.repository.save(user);
  }

  async findByEmail(email: string): Promise<User | null> {
    return await this.repository.findOne({ where: { email } });
  }

  async findById(id: string): Promise<User | null> {
    return await this.repository.findOne({ where: { id } });
  }
}