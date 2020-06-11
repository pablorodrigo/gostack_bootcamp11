import User from '@modules/users/infra/typeorm/entities/User';
import AppError from '@shared/errors/AppError';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import { inject, injectable } from 'tsyringe';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

interface IRequest {
  user_id: string;
}

@injectable()
export default class ListProvidersService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  async execute({ user_id }: IRequest): Promise<User[]> {
    const cashUsers = await this.cacheProvider.recover<User[]>(
      `providers-list:${user_id}`,
    );

    if (!cashUsers) {
      const users = await this.usersRepository.findAllProviders({
        except_user_id: user_id,
      });

      if (users.length === 0) {
        throw new AppError('Empty list');
      }

      await this.cacheProvider.save(`providers-list:${user_id}`, users);

      return users;
    }

    return cashUsers;
  }
}
