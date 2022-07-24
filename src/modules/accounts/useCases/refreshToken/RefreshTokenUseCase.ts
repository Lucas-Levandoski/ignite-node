import { AppError } from '@errors/AppError';
import { IUsersTokensRepository } from '@modules/accounts/repositories/IUsersTokensRepository';
import { verify } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';

@injectable()
export class RefreshTokenUseCase {

  constructor(
    @inject('UserTokensRepository')
    private repository: IUsersTokensRepository,
  ) { }

  async execute(token: string): Promise<void> {
    const secretRefreshToken = process.env.SECRET_REFRESH_TOKEN ?? 'random string';

    const { sub } = verify(token, secretRefreshToken) as { sub: string };

    const userTokens = await this.repository.findByUserId(sub);

    if (!userTokens.length) throw new AppError('user refresh tokens does not exists', 400);

    const userTokenExists = userTokens.find(userToken => (userToken.refreshToken === token));

    if (!userTokenExists) throw new AppError('this user refresh token does not exists', 400);



  }
}