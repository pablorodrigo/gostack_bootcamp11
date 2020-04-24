import { isEqual } from 'date-fns';
import Appointment from '../models/Appointment';

class AppointmentsRepository {
  private appointments: Appointment[];

  constructor() {
    this.appointments = [];
  }

  create(provider: string, date: Date): Appointment {
    const appointment = new Appointment(provider, date);

    this.appointments.push(appointment);

    return appointment;
  }

  findByDate(date: Date): Appointment | null {
    const findAppointment = this.appointments.find(
      appointment => isEqual(date, appointment.date),
    );

    return findAppointment || null;
  }
}

export default AppointmentsRepository;
