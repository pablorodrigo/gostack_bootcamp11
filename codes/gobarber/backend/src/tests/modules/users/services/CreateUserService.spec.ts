import FakeUsersRepository from '@tests/fakes/FakeUsersRepository';

import FakeHashProvider from '@tests/fakes/FakeHashProvider';
import CreateUserService from '@modules/users/services/CreateUserService';
import AppError from '@shared/errors/AppError';
import FakeRedisCacheProvider from '@tests/fakes/FakeRedisCacheProvider';

let fakeHashProvider: FakeHashProvider;
let fakeUserRepository: FakeUsersRepository;
let createUser: CreateUserService;
let fakeCacheProvider: FakeRedisCacheProvider;

describe('CreateUser', () => {
  beforeEach(() => {
    fakeHashProvider = new FakeHashProvider();
    fakeUserRepository = new FakeUsersRepository();
    fakeCacheProvider = new FakeRedisCacheProvider();

    createUser = new CreateUserService(
      fakeUserRepository,
      fakeHashProvider,
      fakeCacheProvider,
    );
  });

  it('should be able to create a new user', async () => {
    const user = await createUser.execute({
      name: 'Judi Doe',
      email: 'judidoe@email.com',
      password: '123456',
    });

    expect(user).toHaveProperty('id');
  });

  it('should not be able to create a new user with email already registered', async () => {
    await createUser.execute({
      name: 'Judi Doe',
      email: 'judidoe@email.com',
      password: '123456',
    });

    await expect(
      createUser.execute({
        name: 'Judi Doe',
        email: 'judidoe@email.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
