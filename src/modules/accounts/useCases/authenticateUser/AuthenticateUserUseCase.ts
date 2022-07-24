import { inject, injectable } from 'tsyringe';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { AppError } from '@errors/AppError';
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
  token: string
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

    const user = await this.usersRepository.findByEmail(email);

    if (!user)
      throw new AppError('Email or password incorrect', 401);

    if (!await compare(password, user.password))
      throw new AppError('Email or password incorrect', 401);

    const token = sign({}, 'cc862772bd3a95d82d2edda0c0a82d1a', {
      subject: user.id,
      expiresIn: '1d'
    });

    return { user: { email: user?.email, name: user?.name }, token };
  }
}