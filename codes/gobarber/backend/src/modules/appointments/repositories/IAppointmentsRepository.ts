import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';
import IFindAllOnMonthFromProviderDTO from '@modules/appointments/dtos/IFindAllOnMonthFromProviderDTO';

export default interface IAppointmentsRepository {
  findAllOnMonthFromProvider(
    data: IFindAllOnMonthFromProviderDTO,
  ): Promise<Appointment[]>;
  create(data: ICreateAppointmentDTO): Promise<Appointment>;
  findByDate(date: Date): Promise<Appointment | undefined>;
}
