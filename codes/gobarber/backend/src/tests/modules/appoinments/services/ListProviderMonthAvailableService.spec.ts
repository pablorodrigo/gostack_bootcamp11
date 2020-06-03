import AppError from '@shared/errors/AppError';
import FakeAppointmentsRepository from '@tests/fakes/FakeAppointmentsRepository';
import ListProviderMonthAvailableService from '@modules/appointments/services/ListProviderMonthAvailableService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listProviderMonthAvailable: ListProviderMonthAvailableService;

describe('ListProviderMonthAvailable', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    listProviderMonthAvailable = new ListProviderMonthAvailableService(
      fakeAppointmentsRepository,
    );
  });

  it('should be able to list available month from provider', async () => {

    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      date: new Date(2020, 4, 20, 8, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      date: new Date(2020, 5, 20, 8, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      date: new Date(2020, 5, 20, 10, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      date: new Date(2020, 5, 21, 8, 0, 0),
    });

    const available = await listProviderMonthAvailable.execute({
      provider_id: 'user',
      year: 2020,
      month: 6,
    });

    expect(available).toEqual(
      expect.arrayContaining([
        { day: 19, available: true },
        { day: 20, available: false },
        { day: 21, available: false },
        { day: 22, available: true },
      ]),
    );
  });
});
