import FakeAppointmentRepository from '@tests/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';
import { uuid } from 'uuidv4';
import AppError from '@shared/errors/AppError';

let fakeAppointmentRepository: FakeAppointmentRepository;
let createAppointment: CreateAppointmentService;
describe('CreateAppointment', () => {
  beforeEach(() => {
    fakeAppointmentRepository = new FakeAppointmentRepository();

    createAppointment = new CreateAppointmentService(fakeAppointmentRepository);
  });

  it('should be able to create a new appointment', async () => {
    const temp_fake_provider_id = uuid();

    const appointment = await createAppointment.execute({
      date: new Date(),
      provider_id: temp_fake_provider_id,
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe(temp_fake_provider_id);
  });

  it('should not be able to create two appointments on the same time', async () => {
    const temp_fake_provider_id = uuid();
    const appointmentDate = new Date(2020, 4, 10, 11);

    await createAppointment.execute({
      date: appointmentDate,
      provider_id: temp_fake_provider_id,
    });

    await expect(
      createAppointment.execute({
        date: appointmentDate,
        provider_id: temp_fake_provider_id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
