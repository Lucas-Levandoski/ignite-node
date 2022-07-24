import { inject, injectable } from 'tsyringe';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { AppError } from '@errors/AppError';
import dayjs, { ManipulateType } from 'dayjs';

import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { IUsersTokensRepository } from '@modules/accounts/repositories/IUsersTokensRepository';

interface IRequest {
  password: string;
  email: string;
}

interface IResponse {
  user: {
    name: string,
    email: string,
  },
  token: string,
  refreshToken: string,
}

@injectable()
export class AuthenticateUserUseCase {

  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('UserTokensRepository')
    private userTokensRepository: IUsersTokensRepository
  ) { }

  async execute({ email, password }: IRequest): Promise<IResponse> {
    const secretToken = process.env.SECRET_TOKEN ?? 'random string';
    const secretRefreshToken = process.env.SECRET_REFRESH_TOKEN ?? 'random string';
    const tokenExpiresIn = process.env.TOKEN_EXPIRES_INT ?? '1d';
    const refreshTokenExpiresIn = process.env.REFRESH_TOKEN_EXPIRES_INT ?? '1d';


    const user = await this.usersRepository.findByEmail(email);

    if (!user)
      throw new AppError('Email or password incorrect', 401);

    if (!await compare(password, user.password))
      throw new AppError('Email or password incorrect', 401);

    const token = sign({}, secretToken, {
      subject: user.id,
      expiresIn: tokenExpiresIn
    });

    const refreshToken = sign({ email }, secretRefreshToken, {
      subject: user.id,
      expiresIn: refreshTokenExpiresIn,
    });

    const [number, unity] = refreshTokenExpiresIn.split(/([a-zA-Z])/);

    this.userTokensRepository.create({
      userId: user.id,
      refreshToken,
      expiresDate: dayjs().add(parseInt(number), unity as ManipulateType).toDate()
    });

    return { user: { email: user?.email, name: user?.name }, token, refreshToken };
  }
}