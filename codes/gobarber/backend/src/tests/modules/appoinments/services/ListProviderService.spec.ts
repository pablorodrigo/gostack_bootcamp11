import FakeUsersRepository from '@tests/fakes/FakeUsersRepository';
import AppError from '@shared/errors/AppError';
import ListProvidersService from '@modules/appointments/services/ListProvidersService';
import FakeRedisCacheProvider from '@tests/fakes/FakeRedisCacheProvider';

let fakeUsersRepository: FakeUsersRepository;
let listProviders: ListProvidersService;
let fakeCacheProvider: FakeRedisCacheProvider;

describe('ListProvidersService', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeCacheProvider = new FakeRedisCacheProvider();
    listProviders = new ListProvidersService(
      fakeUsersRepository,
      fakeCacheProvider,
    );
  });

  it('should be able to list providers', async () => {
    const user1 = await fakeUsersRepository.create({
      name: 'Judi Doe',
      email: 'judidoe@email.com',
      password: '123456',
    });

    const user2 = await fakeUsersRepository.create({
      name: 'Judi Doe2',
      email: 'judidoe@email.com2',
      password: '123123',
    });

    const loggedUser = await fakeUsersRepository.create({
      name: 'Logged user',
      email: 'logged@email.com2',
      password: '123123',
    });

    const providers = await listProviders.execute({ user_id: loggedUser.id });

    expect(providers).toEqual([user1, user2]);
  });

  it('should not be able to list providers if not exist', async () => {
    const loggedUser = await fakeUsersRepository.create({
      name: 'Logged user',
      email: 'logged@email.com2',
      password: '123123',
    });

    await expect(
      listProviders.execute({ user_id: loggedUser.id }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
