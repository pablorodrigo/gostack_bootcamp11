import { isEqual } from 'date-fns';
import Appointment from '../models/Appointment';

// DTO - Data Transfer Object
interface CreateAppointmentDTO {
  provider: string;
  date: Date;
}

class AppointmentsRepository {
  private appointments: Appointment[];

  constructor() {
    this.appointments = [];
  }

  findALl(): Appointment[] {
    return this.appointments;
  }

  create({
    provider,
    date,
  }: CreateAppointmentDTO): Appointment {
    const appointment = new Appointment({ provider, date });

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
