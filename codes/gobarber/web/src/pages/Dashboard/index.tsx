import React, { useCallback, useEffect, useMemo, useState } from 'react';
import DayPicker, { DayModifiers } from 'react-day-picker';
import { isToday, format, parseISO, isAfter } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import 'react-day-picker/lib/style.css';
import { FiClock, FiPower } from 'react-icons/all';
import { Link } from 'react-router-dom';
import {
  Appointment,
  Calendar,
  Container,
  Content,
  Header,
  HeaderContent,
  NextAppointment,
  Profile,
  Schedule,
  Section,
} from './styles';
import logoImg from '../../assets/logo.svg';
import { useAuth } from '../../hooks/auth';
import api from '../../services/api';

interface IMonthAvailabilityItem {
  day: number;
  available: boolean;
}

interface IAppointment {
  id: string;
  date: string;
  hourFormatted: string;
  user: {
    name: string;
    avatar_url: string;
  };
}

const Dashboard: React.FC = () => {
  const weekDays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];
  const months = [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro',
  ];

  const { signOut, user } = useAuth();

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [monthAvailability, setMonthAvailability] = useState<IMonthAvailabilityItem[]>([]);
  const [appointments, setAppointments] = useState<IAppointment[]>([]);

  // console.log(appointments);

  const handleDateChange = useCallback((day: Date, modifiers: DayModifiers) => {
    if (modifiers.available && !modifiers.disabled) {
      setSelectedDate(day);
    }
  }, []);

  const handleMonthChange = useCallback((month: Date) => {
    setCurrentMonth(month);
  }, []);

  useEffect(() => {
    api
      .get(`/providers/${user.id}/month-availability`, {
        params: {
          year: currentMonth.getFullYear(),
          month: currentMonth.getMonth() + 1,
        },
      })
      .then((response) => setMonthAvailability(response.data));
  }, [currentMonth, user.id]);

  // load appointments
  useEffect(() => {
    api
      .get<IAppointment[]>('/appointments/me', {
        params: {
          year: currentMonth.getFullYear(),
          month: currentMonth.getMonth() + 1,
          day: selectedDate.getDate(),
        },
      })
      .then((response) => {
        const appointmentsFormatted = response.data.map((appointment) => {
          return {
            ...appointment,
            hourFormatted: format(parseISO(appointment.date), 'HH:mm'),
          };
        });
        setAppointments(appointmentsFormatted);
      });
  }, [currentMonth, selectedDate]);

  const disabledDays = useMemo(() => {
    const dates = monthAvailability
      .filter((monthDay) => monthDay.available === false)
      .map((monthDay) => {
        const year = currentMonth.getFullYear();
        const month = currentMonth.getMonth();
        const date = new Date(year, month, monthDay.day);

        return date;
      });
    return dates;
  }, [currentMonth, monthAvailability]);

  const selectDateAsText = useMemo(() => {
    return format(selectedDate, "'Dia' dd 'de' MMMM", {
      locale: ptBR,
    });
  }, [selectedDate]);

  const selectWeekDay = useMemo(() => {
    return format(selectedDate, 'cccc', {
      locale: ptBR,
    });
  }, [selectedDate]);

  const morningAppointments = useMemo(() => {
    return appointments.filter((appointment) => {
      return parseISO(appointment.date).getHours() < 12;
    });
  }, [appointments]);
  const afternoonAppointments = useMemo(() => {
    return appointments.filter((appointment) => {
      return parseISO(appointment.date).getHours() >= 12;
    });
  }, [appointments]);
  const nextAppointment = useMemo(() => {
    return appointments.find((appointment) => isAfter(parseISO(appointment.date), new Date()));
  }, [appointments]);

  return (
    <Container>
      <Header>
        <HeaderContent>
          <img src={logoImg} alt="Gobarber" />
          <Profile>
            <img src={user.avatar_url} alt="Gobarber" />
            <div>
              <span>Bem vindo,</span>
              <Link to="/profile">
                <strong>{user.name}</strong>
              </Link>
            </div>
          </Profile>

          <button type="button" onClick={signOut}>
            <FiPower />
          </button>
        </HeaderContent>
      </Header>

      <Content>
        <Schedule>
          <h1>Horários agendados</h1>
          <p>
            {isToday(selectedDate) && <span>Hoje</span>}
            <span>{selectDateAsText}</span>
            <span>{selectWeekDay}</span>
          </p>

          {isToday(selectedDate) && nextAppointment && (
            <NextAppointment>
              <strong>Atendimento a seguir</strong>
              <div>
                <img src={nextAppointment.user.avatar_url} alt={nextAppointment.user.name} />
                <strong>{nextAppointment.user.name}</strong>
                <span>
                  <FiClock />
                  {nextAppointment.hourFormatted}
                </span>
              </div>
            </NextAppointment>
          )}

          <Section>
            <strong>Manhã</strong>

            {morningAppointments.length === 0 && <p>Nenhum agendamento nesse periodo</p>}

            {morningAppointments.map((appointment) => (
              <Appointment key={appointment.id}>
                <span>
                  <FiClock />
                  {appointment.hourFormatted}
                </span>

                <div>
                  <img src={appointment.user.avatar_url} alt={appointment.user.name} />
                  <strong>{appointment.user.name}</strong>
                </div>
              </Appointment>
            ))}
          </Section>
          <Section>
            <strong>Tarde</strong>

            {afternoonAppointments.length === 0 && <p>Nenhum agendamento nesse periodo</p>}

            {afternoonAppointments.map((appointment) => (
              <Appointment key={appointment.id}>
                <span>
                  <FiClock />
                  {appointment.hourFormatted}
                </span>

                <div>
                  <img src={appointment.user.avatar_url} alt={appointment.user.name} />
                  <strong>{appointment.user.name}</strong>
                </div>
              </Appointment>
            ))}
          </Section>
        </Schedule>
        <Calendar>
          <DayPicker
            disabledDays={[
              {
                daysOfWeek: [0, 6],
              },
              ...disabledDays,
            ]}
            fromMonth={new Date()}
            weekdaysShort={weekDays}
            months={months}
            onMonthChange={handleMonthChange}
            onDayClick={handleDateChange}
            selectedDays={selectedDate}
            modifiers={{
              available: { daysOfWeek: [1, 2, 3, 4, 5] },
            }}
          />
        </Calendar>
      </Content>
    </Container>
  );
};

export default Dashboard;
