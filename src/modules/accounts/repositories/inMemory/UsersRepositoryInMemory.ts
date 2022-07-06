
import { ICreateUserDTO } from '@modules/accounts/dtos/ICreateUserDTO';
import { User } from '@modules/accounts/entities/User';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { hash } from 'bcryptjs';


export class UsersRepositoryInMemory implements IUsersRepository {

  users: User[] = [];

  async create({ name, email, driverLicense, password, avatar }: ICreateUserDTO): Promise<void> {

    const user = new User();

    const passwordHash = await hash(password, 5);

    Object.assign(user, {
      name, email, driverLicense, password: passwordHash, avatar
    });

    this.users.push(user);
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.users.find(user => user.email === email) ?? null;
  }

  async findById(id: string): Promise<User | null> {
    return this.users.find(user => user.id === id) ?? null;
  }
}