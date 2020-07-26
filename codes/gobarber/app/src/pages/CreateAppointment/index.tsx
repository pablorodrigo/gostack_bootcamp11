import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useRoute, useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Alert, Platform, Text } from 'react-native';
import { format } from 'date-fns';
import {
  BackButton,
  Calendar,
  Container,
  Content,
  CreateAppointmentButton,
  CreateAppointmentButtonText,
  Header,
  HeaderTitle,
  Hour,
  HourText,
  OpenDatePickerButton,
  OpenDatePickerButtonText,
  ProviderAvatar,
  ProviderContainer,
  ProviderName,
  ProvidersList,
  ProvidersListContainer,
  Schedule,
  Section,
  SectionContent,
  SectionTitle,
  Title,
  UserAvatar,
} from './styles';
import { useAuth } from '../../hooks/auth';
import api from '../../services/api';
import { IProvider } from '../Dashboard';

interface IRouteParams {
  providerId: string;
}

interface IAvailabilityItem {
  hour: number;
  available: boolean;
}

export interface IHourProps {
  available: boolean;
  selected: boolean;
}

export interface IHourTextProps {
  selected: boolean;
}

const CreateAppointment: React.FC = () => {
  const { user } = useAuth();
  const route = useRoute();
  const { goBack, navigate } = useNavigation();
  // const { providerId } = route.params as IRouteParams;
  const providerId = route.params;

  const [availability, setAvailability] = useState<IAvailabilityItem[]>([]);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectHour, setSelectHour] = useState(0);
  const [providers, setProviders] = useState<IProvider[]>([]);
  const [selectedProvider, setSelectedProvider] = useState(providerId);

  const navigateBack = useCallback(() => {
    goBack();
  }, [goBack]);

  useEffect(() => {
    api
      .get(`providers/${selectedProvider}/day-availability`, {
        params: {
          year: selectedDate.getFullYear(),
          month: selectedDate.getMonth() + 1,
          day: selectedDate.getDate(),
        },
      })
      .then((response) => {
        setAvailability(response.data);
        console.log(response.data);
      });
  }, [selectedDate, selectedProvider]);

  const handleSelectProvider = useCallback((id: string) => {
    setSelectedProvider(id);
  }, []);

  useEffect(() => {
    api.get('providers').then((response) => {
      setProviders(response.data);
    });
  }, []);

  const handleToggleDatePicker = useCallback(() => {
    setShowDatePicker((state) => !state);
  }, []);

  const handleDateChange = useCallback((event: any, date: Date | undefined) => {
    // for android
    if (Platform.OS === 'android') {
      setShowDatePicker(false);
    }

    if (date) {
      setSelectedDate(date);
    }
  }, []);

  const morningAvailability = useMemo(() => {
    return availability
      .filter(({ hour }) => hour < 12)
      .map(({ hour, available }) => {
        return {
          hour,
          available,
          hourFormatted: format(new Date().setHours(hour), 'HH:00'),
        };
      });
  }, [availability]);

  const afternoonAvailability = useMemo(() => {
    return availability
      .filter(({ hour }) => hour >= 12)
      .map(({ hour, available }) => {
        return {
          hour,
          available,
          hourFormatted: format(new Date().setHours(hour), 'HH:00'),
        };
      });
  }, [availability]);

  const handleSelectHour = useCallback((hour: number) => {
    setSelectHour(hour);
  }, []);

  const handleCreateAppointment = useCallback(async () => {
    try {
      const date = new Date(selectedDate);

      date.setHours(selectHour);
      date.setMinutes(0);

      await api.post('appointments', {
        // eslint-disable-next-line @typescript-eslint/camelcase
        provider_id: selectedProvider,
        date,
      });

      navigate('AppointmentCreated', {
        date: date.getTime(),
      });
    } catch (error) {
      Alert.alert(
        'Error ao criar agendamento',
        'Ocorreu um error ao tentar criar o agend, tente novamente',
      );
    }
  }, [navigate, selectHour, selectedDate, selectedProvider]);

  return (
    <Container>
      <Header>
        <BackButton onPress={navigateBack}>
          <Icon name="chevron-left" size={25} color="#999591" />
        </BackButton>
        <HeaderTitle>Cabeleireiros</HeaderTitle>
        <UserAvatar source={{ uri: user.avatar_url }} />
      </Header>
      <Content>
        <ProvidersListContainer>
          <ProvidersList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={providers}
            keyExtractor={(provider) => provider.id}
            renderItem={({ item: provider }) => (
              <ProviderContainer
                onPress={() => handleSelectProvider(provider.id)}
                selected={provider.id === selectedProvider}
              >
                <ProviderAvatar source={{ uri: provider.avatar_url }} />
                <ProviderName selected={provider.id === selectedProvider}>
                  {provider.name}
                </ProviderName>
              </ProviderContainer>
            )}
          />
        </ProvidersListContainer>

        <Calendar>
          <Title>Escolha a data </Title>
          <OpenDatePickerButton onPress={handleToggleDatePicker}>
            <OpenDatePickerButtonText>Selecionar data</OpenDatePickerButtonText>
          </OpenDatePickerButton>
          {showDatePicker && (
            <DateTimePicker
              mode="date"
              display="calendar"
              onChange={handleDateChange}
              textColor="#f4ede8"
              value={selectedDate}
            />
          )}
        </Calendar>

        <Schedule>
          <Title>Escolha o horário</Title>
          <Section>
            <SectionTitle>Manhã</SectionTitle>
            <SectionContent>
              {morningAvailability.map(({ hourFormatted, available, hour }) => (
                <Hour
                  enabled={available}
                  selected={selectHour === hour}
                  available={available}
                  key={hourFormatted}
                  onPress={() => handleSelectHour(hour)}
                >
                  <HourText selected={selectHour === hour}>{hourFormatted}</HourText>
                </Hour>
              ))}
            </SectionContent>
          </Section>

          <Section>
            <SectionTitle>Tarde</SectionTitle>
            <SectionContent>
              {afternoonAvailability.map(({ hourFormatted, available, hour }) => (
                <Hour
                  enabled={available}
                  selected={selectHour === hour}
                  available={available}
                  key={hourFormatted}
                  onPress={() => handleSelectHour(hour)}
                >
                  <HourText selected={selectHour === hour}>{hourFormatted}</HourText>
                </Hour>
              ))}
            </SectionContent>
          </Section>
        </Schedule>

        <CreateAppointmentButton onPress={handleCreateAppointment}>
          <CreateAppointmentButtonText>Agendar</CreateAppointmentButtonText>
        </CreateAppointmentButton>
      </Content>
    </Container>
  );
};

export default CreateAppointment;
