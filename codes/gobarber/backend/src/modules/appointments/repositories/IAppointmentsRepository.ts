import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';
import IFindAllOnMonthFromProviderDTO from '@modules/appointments/dtos/IFindAllOnMonthFromProviderDTO';
import IFindAllOnDayFromProviderDTO from '@modules/appointments/dtos/IFindAllOnDayFromProviderDTO';

export default interface IAppointmentsRepository {
  create(data: ICreateAppointmentDTO): Promise<Appointment>;
  findByDate(date: Date): Promise<Appointment | undefined>;
  findAllOnMonthFromProvider(
    data: IFindAllOnMonthFromProviderDTO,
  ): Promise<Appointment[]>;
  findAllOnDayFromProvider(
    data: IFindAllOnDayFromProviderDTO,
  ): Promise<Appointment[]>;
}
