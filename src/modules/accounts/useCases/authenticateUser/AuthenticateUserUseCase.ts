import { inject, injectable } from 'tsyringe';
import { IUsersRepository } from '../../repositories/IUsersRepository';
import { compare } from 'bcryptjs';
import { PassThrough } from 'stream';
import { sign } from 'jsonwebtoken';

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
    private usersRepository: IUsersRepository
  ) { }

  async execute({ email, password }: IRequest): Promise<IResponse> {

    const user = await this.usersRepository.findByEmail(email);

    if (!user)
      throw new Error('Email or password incorrect');

    if (!await compare(password, user.password))
      throw new Error('Email or password incorrect');

    const token = sign({}, 'cc862772bd3a95d82d2edda0c0a82d1a', {
      subject: user.id,
      expiresIn: '1d'
    });

    return { user: { email: user?.email, name: user?.name }, token };
  }
}