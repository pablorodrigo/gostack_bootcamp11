import FakeUsersRepository from '@tests/fakes/FakeUsersRepository';
import FakeHashProvider from '@tests/fakes/FakeHashProvider';
import UpdateProfileService from '@modules/users/services/UpdateProfileService';
import AppError from '@shared/errors/AppError';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let updateProfile: UpdateProfileService;

describe('UpdateProfileService', () => {
  beforeEach(() => {
    fakeHashProvider = new FakeHashProvider();
    fakeUsersRepository = new FakeUsersRepository();
    updateProfile = new UpdateProfileService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });

  it('should be able to update profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Judi Doe',
      email: 'judidoe@email.com',
      password: '123456',
    });

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'Judi Doe updated',
      email: 'judidoe@email.com.updated',
    });

    expect(updatedUser.name).toBe('Judi Doe updated');
    expect(updatedUser.email).toBe('judidoe@email.com.updated');
  });

  it('should be able to change email to an email already registered ', async () => {
    await fakeUsersRepository.create({
      name: 'Judi Doe',
      email: 'judidoe@email.com',
      password: '123456',
    });

    const user = await fakeUsersRepository.create({
      name: 'Test',
      email: 'test@examplc.i',
      password: '123456',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'Judi Doe updated',
        email: 'judidoe@email.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to update the password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Judi Doe',
      email: 'judidoe@email.com',
      password: '123456',
    });

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'Judi Doe updated',
      email: 'judidoe@email.com.updated',
      old_password: '123456',
      password: '123123',
    });

    expect(updatedUser.password).toBe('123123');
  });

  it('should not be able to update the password without old_password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Judi Doe',
      email: 'judidoe@email.com',
      password: '123456',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'Judi Doe updated',
        email: 'judidoe@email.com.updated',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update the password if the old password is incorrect', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Judi Doe',
      email: 'judidoe@email.com',
      password: '123456',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'Judi Doe updated',
        email: 'judidoe@email.com.updated',
        old_password: 'old-wrong-password',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update a user that does not exist', async () => {
    await expect(
      updateProfile.execute({
        user_id: 'wrong-id',
        name: 'Judi Doe updated',
        email: 'judidoe@email.com.updated',
        old_password: 'old-wrong-password',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
