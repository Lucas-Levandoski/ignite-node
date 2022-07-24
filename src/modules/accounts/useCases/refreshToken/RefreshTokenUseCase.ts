import { AppError } from '@errors/AppError';
import { IUsersTokensRepository } from '@modules/accounts/repositories/IUsersTokensRepository';
import dayjs, { ManipulateType } from 'dayjs';
import { sign, verify } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';

@injectable()
export class RefreshTokenUseCase {

  constructor(
    @inject('UserTokensRepository')
    private repository: IUsersTokensRepository,
  ) { }

  async execute(token: string): Promise<string> {
    const secretRefreshToken = process.env.SECRET_REFRESH_TOKEN ?? 'random string';
    const refreshTokenExpiresIn = process.env.REFRESH_TOKEN_EXPIRES_INT ?? '1d';

    const { sub, email } = verify(token, secretRefreshToken) as { sub: string, email: string };

    const userTokens = await this.repository.findByUserId(sub);
    if (!userTokens.length) throw new AppError('user refresh tokens does not exists', 400);

    const userTokenExists = userTokens.find(userToken => (userToken.refreshToken === token));
    if (!userTokenExists) throw new AppError('this user refresh token does not exists', 400);

    await this.repository.deleteById(userTokenExists.id);

    const newRefreshToken = sign({ email }, secretRefreshToken, {
      subject: sub,
      expiresIn: refreshTokenExpiresIn
    });

    const [number, unity] = refreshTokenExpiresIn.split(/([a-zA-Z])/);

    await this.repository.create({
      refreshToken: newRefreshToken,
      userId: sub,
      expiresDate: dayjs().add(parseInt(number), unity as ManipulateType).toDate()
    });

    return newRefreshToken;
  }
}