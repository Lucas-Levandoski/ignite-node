import { AppError } from '@errors/AppError';
import { UsersRepository } from '@modules/accounts/infra/typeorm/repositories/UsersRepository';
import { UsersTokensRepository } from '@modules/accounts/infra/typeorm/repositories/UsersTokensRepository';
import { IMailProvider } from '@shared/providers/IMailProvider';
import dayjs from 'dayjs';
import { inject, injectable } from 'tsyringe';
import { v4 as uuidV4 } from 'uuid';


@injectable()
export class SendForgotPasswordUseCase {

  constructor(
    @inject('UsersRepository')
    private usersRepository: UsersRepository,
    @inject('UserTokensRepository')
    private usersTokensRepository: UsersTokensRepository,
    @inject('MailProvider')
    private emailProvider: IMailProvider,
  ) { }

  async execute(email: string): Promise<void> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) throw new AppError('user not found', 400);

    console.log(user.email);

    const token = uuidV4();

    await this.usersTokensRepository.create({
      refreshToken: token,
      userId: user.id,
      expiresDate: dayjs().add(1, 'h').toDate()
    });

    await this.emailProvider.sendMail(user.email, 'password recovery', `The password recovery URL is ${token}`);
  }
}
