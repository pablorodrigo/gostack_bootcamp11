import FakeUsersRepository from '@tests/fakes/FakeUsersRepository';
import FakeHashProvider from '@tests/fakes/FakeHashProvider';
import UpdateProfileService from '@modules/users/services/UpdateProfileService';
import AppError from '@shared/errors/AppError';
import ShowProfileService from '@modules/users/services/ShowProfileService';

let fakeUsersRepository: FakeUsersRepository;
let showProfile: ShowProfileService;

describe('ShowProfileService', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    showProfile = new ShowProfileService(fakeUsersRepository);
  });

  it('should be able to show profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Judi Doe',
      email: 'judidoe@email.com',
      password: '123456',
    });

    const profile = await showProfile.execute({
      user_id: user.id,
    });

    expect(profile.name).toBe('Judi Doe');
    expect(profile.email).toBe('judidoe@email.com');
  });

  it('should not be able to show a profile that does not exist', async () => {
    await expect(
      showProfile.execute({
        user_id: 'user-not-exist',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
