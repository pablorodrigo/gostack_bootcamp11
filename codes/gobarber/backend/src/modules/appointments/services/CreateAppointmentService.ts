import { getHours, isBefore, startOfHour } from 'date-fns';
import AppError from '@shared/errors/AppError';
import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import { injectable, inject } from 'tsyringe';

interface IRequest {
  date: Date;
  user_id: string;
  provider_id: string;
}

@injectable()
class CreateAppointmentService {
  /* private appointmentsRepository: IAppointmentsRepository;

  constructor(appointmentsRepository: AppointmentsRepository) {
    this.appointmentsRepository = appointmentsRepository;
  } */

  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,
  ) {}

  async execute({
    date,
    provider_id,
    user_id,
  }: IRequest): Promise<Appointment> {
    const appointmentDate = startOfHour(date);

    if (getHours(appointmentDate) < 8 || getHours(appointmentDate) > 17) {
      throw new AppError('You can only create appointment between 8am and 6pm');
    }
    if (isBefore(appointmentDate, Date.now())) {
      throw new AppError('You can not create appointment on the past date');
    }

    if (provider_id === user_id) {
      throw new AppError('You can not  create an appointment with yourself');
    }

    const findAppointmentInSameDate = await this.appointmentsRepository.findByDate(
      appointmentDate,
    );

    // check if already exist date booked
    if (findAppointmentInSameDate) {
      throw new AppError('This date is already booked');
    }

    const appointment = await this.appointmentsRepository.create({
      provider_id,
      user_id,
      date: appointmentDate,
    });

    return appointment;
  }
}

export default CreateAppointmentService;
