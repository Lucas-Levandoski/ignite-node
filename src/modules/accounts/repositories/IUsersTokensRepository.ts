import { ICreateUserTokenDTO } from '../dtos/ICreateUserTokenDTO';
import { UserTokens } from '../infra/typeorm/entities/UserTokens';



export interface IUsersTokensRepository {
  create(data: ICreateUserTokenDTO): Promise<UserTokens>;
}