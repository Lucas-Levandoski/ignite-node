import { container } from 'tsyringe';

import { ICategoriesRepository } from '@modules/cars/repositories/ICategoriesRepository';
import { CategoriesRepository } from '@modules/cars/infra/typeorm/repositories/CategoriesRepository';

import { ISpecificationsRepository } from '@modules/cars/repositories/ISpecificationsRepository';
import { SpecificationsRepository } from '@modules/cars/infra/typeorm/repositories/SpecificationsRepository';

import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { UsersRepository } from '@modules/accounts/infra/typeorm/repositories/UsersRepository';

import { IUsersTokensRepository } from '@modules/accounts/repositories/IUsersTokensRepository';
import { UsersTokensRepository } from '@modules/accounts/infra/typeorm/repositories/UsersTokensRepository';

import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';
import { CarsRepository } from '@modules/cars/infra/typeorm/repositories/CarsRepository';

import { ICarsImageRepository } from '@modules/cars/repositories/ICarsImageRepository';
import { CarsImageRepository } from '@modules/cars/infra/typeorm/repositories/CarsImageRepository';

import { IRentalsRepository } from '@modules/cars/repositories/IRentalsRepository';
import { RentalsRepository } from '@modules/cars/infra/typeorm/repositories/RentalsRepository';

import { IMailProvider } from '@shared/providers/IMailProvider';
import { EtherealMailProvider } from '@shared/providers/implementations/EtherealMailProvider';


container.registerSingleton<ICategoriesRepository>('CategoriesRepository', CategoriesRepository);
container.registerSingleton<ISpecificationsRepository>('SpecificationsRepository', SpecificationsRepository);
container.registerSingleton<IUsersRepository>('UsersRepository', UsersRepository);
container.registerSingleton<IUsersTokensRepository>('UserTokensRepository', UsersTokensRepository);
container.registerSingleton<ICarsRepository>('CarsRepository', CarsRepository);
container.registerSingleton<ICarsImageRepository>('CarsImagesRepository', CarsImageRepository);
container.registerSingleton<IRentalsRepository>('RentalsRepository', RentalsRepository);
container.registerInstance<IMailProvider>('MailProvider', new EtherealMailProvider());


