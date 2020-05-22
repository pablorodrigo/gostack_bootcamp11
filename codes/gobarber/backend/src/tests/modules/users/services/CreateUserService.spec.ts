import FakeUsersRepository from '@tests/fakes/FakeUsersRepository';
import CreateUserService from '@modules/users/services/CreateUserService';
import AppError from '@shared/errors/AppError';

describe('CreateUser', () => {
  it('should be able to create a new user', async () => {
    const fakeUserRepository = new FakeUsersRepository();
    const createUser = new CreateUserService(fakeUserRepository);

    const user = await createUser.execute({
      name: 'Judi Doe',
      email: 'judidoe@email.com',
      password: '123456',
    });

    expect(user).toHaveProperty('id');
  });

  it('should not be able to create a new user with email already registered', async () => {
    const fakeUserRepository = new FakeUsersRepository();
    const createUser = new CreateUserService(fakeUserRepository);

    await createUser.execute({
      name: 'Judi Doe',
      email: 'judidoe@email.com',
      password: '123456',
    });

    expect(
      createUser.execute({
        name: 'Judi Doe',
        email: 'judidoe@email.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
