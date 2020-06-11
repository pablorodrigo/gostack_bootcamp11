import { inject, injectable } from 'tsyringe';
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import { getDate, getDaysInMonth } from 'date-fns';
import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

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

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  async execute({
    provider_id,
    day,
    year,
    month,
  }: IRequest): Promise<Appointment[]> {
    const cacheKey = `provider-appointments:${provider_id}:${year}-${month}-${day}`;
    const cacheAppointments = await this.cacheProvider.recover<Appointment[]>(
      cacheKey,
    );

    if (!cacheAppointments) {
      const appointments = await this.appointmentsRepository.findAllOnDayFromProvider(
        {
          provider_id,
          day,
          year,
          month,
        },
      );

      console.log('buscou no banco');

      return appointments;
    }

    console.log('buscou no cache');

    await this.cacheProvider.save(cacheKey, cacheAppointments);

    return cacheAppointments;
  }
}
