import { uuid } from 'uuidv4';
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';
import {getDate, getMonth, getYear, isEqual} from 'date-fns';
import IFindAllOnMonthFromProviderDTO from '@modules/appointments/dtos/IFindAllOnMonthFromProviderDTO';
import IFindAllOnDayFromProviderDTO from "@modules/appointments/dtos/IFindAllOnDayFromProviderDTO";

class FakeAppointmentsRepository implements IAppointmentsRepository {
  private appointments: Appointment[] = [];

  async findByDate(date: Date): Promise<Appointment | undefined> {
    const findAppointment = this.appointments.find(
      // appointment => appointment.date === date,
      appointment => isEqual(appointment.date, date),
    );

    return findAppointment;
  }

  async create({
    date,
    provider_id,
  }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = new Appointment();

    Object.assign(appointment, { id: uuid(), date, provider_id });

    /*  appointment.id = uuid();
    appointment.date = date;
    appointment.provider_id = provider_id; */

    this.appointments.push(appointment);

    return appointment;
  }

  async findAllOnMonthFromProvider({
    month,
    provider_id,
    year,
  }: IFindAllOnMonthFromProviderDTO): Promise<Appointment[]> {
    console.log(this.appointments);
    const appointments = this.appointments.filter(
      appointment =>
        appointment.provider_id === provider_id &&
        getMonth(appointment.date) + 1 === month &&
        getYear(appointment.date) === year,
    );

    return appointments;
  }

  async findAllOnDayFromProvider({
    month,
    provider_id,
    year,
    day,
  }: IFindAllOnDayFromProviderDTO): Promise<Appointment[]> {
    const appointments = this.appointments.filter(
      appointment =>
        appointment.provider_id === provider_id &&
        getDate(appointment.date) === day &&
        getMonth(appointment.date) + 1 === month &&
        getYear(appointment.date) === year,
    );

    return appointments;
  }
}

export default FakeAppointmentsRepository;
