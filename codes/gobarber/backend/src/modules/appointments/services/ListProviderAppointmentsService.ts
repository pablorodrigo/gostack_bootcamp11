import { inject, injectable } from 'tsyringe';
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import { getDate, getDaysInMonth } from 'date-fns';
import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';

interface IRequest {
  provider_id: string;
  day: number;
  month: number;
  year: number;
}

@injectable()
export default class ListProviderAppointmentsService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,
  ) {}

  async execute({
    provider_id,
    day,
    year,
    month,
  }: IRequest): Promise<Appointment[]> {
    const appointments = await this.appointmentsRepository.findAllOnDayFromProvider(
      {
        provider_id,
        day,
        year,
        month,
      },
    );

    return appointments;
  }
}
