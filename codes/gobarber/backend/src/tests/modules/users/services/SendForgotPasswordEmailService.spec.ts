import FakeUsersRepository from '@tests/fakes/FakeUsersRepository';

import FakeHashProvider from '@tests/fakes/FakeHashProvider';
import CreateUserService from '@modules/users/services/CreateUserService';
import AppError from '@shared/errors/AppError';
import SendForgotPasswordEmailService from '@modules/users/services/SendForgotPasswordEmailService';
import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';

describe('SendForgotPasswordEmailService', () => {
  it('should be able to recover the password using the email', async () => {
    const fakeUserRepository = new FakeUsersRepository();
    const fakeMailProvider = new FakeMailProvider();

    const sendEmail = jest.spyOn(fakeMailProvider, 'sendMail');

    const sendForgotPasswordEmail = new SendForgotPasswordEmailService(
      fakeUserRepository,
      fakeMailProvider,
    );

    await fakeUserRepository.create({
      name: 'Judi Doe',
      email: 'judidoe@email.com',
      password: '123456',
    });

    await sendForgotPasswordEmail.execute({ email: 'judidoe@email.com' });

    expect(sendEmail).toHaveBeenCalled();
  });

  it('should be not able to recover a non-existing user password', async () => {
    const fakeUserRepository = new FakeUsersRepository();
    const fakeMailProvider = new FakeMailProvider();

    const sendForgotPasswordEmail = new SendForgotPasswordEmailService(
      fakeUserRepository,
      fakeMailProvider,
    );

    await expect(
      sendForgotPasswordEmail.execute({ email: 'judidoe@email.com' }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
