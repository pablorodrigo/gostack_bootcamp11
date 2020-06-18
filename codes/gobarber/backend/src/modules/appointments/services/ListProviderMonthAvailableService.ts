import { inject, injectable } from 'tsyringe';
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import { getDate, getDaysInMonth, isAfter } from 'date-fns';

interface IRequest {
  provider_id: string;
  month: number;
  year: number;
}

type IResponse = Array<{
  day: number;
  available: boolean;
}>;

@injectable()
export default class ListProviderMonthAvailableService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,
  ) {}

  async execute({ provider_id, year, month }: IRequest): Promise<IResponse> {
    const appointments = await this.appointmentsRepository.findAllOnMonthFromProvider(
      { provider_id, year, month },
    );

    const numberOfDaysInMonth = getDaysInMonth(new Date(year, month - 1));

    const eachDay = Array.from(
      { length: numberOfDaysInMonth },
      (_, index) => index + 1,
    );

    // 8h to 17h
    const available = eachDay.map(day => {
      const endOfTheDay = new Date(year, month - 1, day, 23, 59, 59);

      const appointmentInDay = appointments.filter(appointment => {
        return getDate(appointment.date) === day;
      });

      return {
        day,
        available:
          isAfter(endOfTheDay, new Date()) && appointmentInDay.length < 10,
      };
    });

    // console.log(appointments);
    return available;
  }
}
