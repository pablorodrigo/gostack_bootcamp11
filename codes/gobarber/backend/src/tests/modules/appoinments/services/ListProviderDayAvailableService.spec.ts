import AppError from '@shared/errors/AppError';
import FakeAppointmentsRepository from '@tests/fakes/FakeAppointmentsRepository';
import ListProviderDayAvailableService from '@modules/appointments/services/ListProviderDayAvailableService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listProviderDayAvailable: ListProviderDayAvailableService;

describe('ListProviderDayAvailable', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    listProviderDayAvailable = new ListProviderDayAvailableService(
      fakeAppointmentsRepository,
    );
  });

  it('should be able to list available day from provider', async () => {
    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      date: new Date(2020, 4, 20, 8, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      date: new Date(2020, 4, 20, 10, 0, 0),
    });

    const available = await listProviderDayAvailable.execute({
      provider_id: 'user',
      year: 2020,
      month: 5,
      day: 20,
    });

    expect(available).toEqual(
      expect.arrayContaining([
        { hour: 8, available: false },
        { hour: 9, available: true },
        { hour: 10, available: false },
        { hour: 11, available: true },
      ]),
    );
  });
});
