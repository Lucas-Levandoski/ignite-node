import PostgresDataSource from '@database/index';
import { ICreateUserTokenDTO } from '@modules/accounts/dtos/ICreateUserTokenDTO';
import { IUsersTokensRepository } from '@modules/accounts/repositories/IUsersTokensRepository';
import { Repository } from 'typeorm';
import { UserTokens } from '../entities/UserTokens';

export class UsersTokensRepository implements IUsersTokensRepository {

  private repository: Repository<UserTokens>;


  constructor() {
    this.repository = PostgresDataSource.getRepository(UserTokens);
  }

  async create(data: ICreateUserTokenDTO): Promise<UserTokens> {
    const userToken = this.repository.create(data);

    await this.repository.save(userToken);

    return userToken;
  }

  async findByUserId(userId: string): Promise<UserTokens[]> {
    return await this.repository.find({
      where: {
        userId
      }
    });
  }
}