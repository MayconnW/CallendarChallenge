import {
 Stack, InputGroup, InputLeftElement, Input, Text, Flex, Button, HStack, Circle, Image
} from '@chakra-ui/react';
import { format } from 'date-fns';
import { EditIcon, InfoOutlineIcon, TimeIcon } from '@chakra-ui/icons';
import { useCallback, useEffect, useState } from 'react';
import { Reminder } from 'domain/calendar/reminder/types';
import { Description, Time } from 'domain/calendar/reminder/value-objects';
import { toast } from 'react-toastify';
import AsyncSelect from 'react-select/async';
import { getCitiesByName, City, getWeatherByCityName, WeatherByDay } from 'services';
import { selectStyles } from './styles'

const availableColors = ['#f2f20a', '#6beb34', '#4f6bf5', '#f229e8', '#eb172d'];

type Props = {
  onCancel(): Promise<void> | void;
  onSave(reminder: Reminder): Promise<void> | void;
  date: Date;
  reminder?: Reminder;
}

export default function ReminderForm(props: Props) {

  const { onCancel, onSave, date } = props;

  const [showErrors, setShowErrors] = useState(false);
  const [description, setDescription] = useState<Description>(props.reminder ? new Description(props.reminder.description.getOrCrash()) : new Description(''));
  const [time, setTime] = useState<Time>(props.reminder ? new Time(props.reminder.time.getOrCrash()) : new Time(''));
  const [city, setCity] = useState<City | null>(props.reminder ? props.reminder.city : null);
  const [weather, setWeather] = useState<WeatherByDay | null>(null);
  const [amPm, setAmPm] = useState<'am'|'pm'>(props.reminder ? props.reminder.amPm : 'am');
  const [colorSelected, setColorSelected] = useState(props.reminder ? props.reminder.color : '#f2f20a');
  const [id] = useState(props.reminder ? props.reminder.id : `${(new Date()).getTime()}`)

  useEffect(() => {
    setWeather(null);
    if (city?.label) {
      getWeatherByCityName(city?.label).then(response => {
        const foundWeather = response?.find(item => format(item.date, 'dd/MM') === format(date, 'dd/MM'));
        if (foundWeather) {
          setWeather(foundWeather);
        }
      })
    }
  }, [city, date]);

  const isFormValid = useCallback(() => {
    return description.isValid() && time.isValid();
  }, [description, time]);

  const onSaveClick = useCallback(async () => {
    setShowErrors(true);
    if (!isFormValid()) {
      toast.error('Please check the form errors!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
      });
      return;
    }

    await onSave({
      id,
      city,
      description,
      time,
      amPm,
      date,
      color: colorSelected
    });
  }, [isFormValid, time, description, city, colorSelected, date, onSave, amPm, id]);

  const loadCities = async (inputValue: string) => {
    if (inputValue.length < 3) {
      return [{ value: '-1', label: 'Type 3 characteres to search' }];
    }

    const result = await getCitiesByName(inputValue);

    return result;
  };

  return (
    <Stack p={4} spacing={4} w="400px">
      <Text textAlign="center" color="gray.500">Adding Reminder</Text>
      <InputGroup flexDirection="column">
        <InputLeftElement
          pointerEvents='none'
          children={<EditIcon color='gray.300' />}
        />
        <Input 
          placeholder='Description' 
          maxLength={30}
          onChange={e => setDescription(new Description(e.currentTarget.value))}
          defaultValue={description.getValueOrFailedValue()}
        />
        {showErrors && !description.isValid() && (<Text color='tomato'>{description.getErrorMessage()}</Text>)}
      </InputGroup>

      <Stack>
        <HStack spacing={1}>
          <InputGroup>
            <InputLeftElement
              pointerEvents='none'
              children={<TimeIcon color='gray.300' />}
            />
            <Input 
              type='tel' 
              placeholder='10:00' 
              maxLength={30}
              onChange={e => setTime(new Time(e.currentTarget.value))}
              defaultValue={time.getValueOrFailedValue()}
            />
          </InputGroup>
          <Flex justifyContent="center">
            <Button 
              colorScheme={amPm === 'am' ? 'blue' : 'gray'}
              onClick={() => setAmPm('am')}
            >
              am
            </Button>
            <Button 
              colorScheme={amPm === 'pm' ? 'blue' : 'gray'} 
              onClick={() => setAmPm('pm')}
              ml={2}
            >
              pm
            </Button>
          </Flex>
        </HStack>
        {showErrors && !time.isValid() && (<Text color='tomato'>{time.getErrorMessage()}</Text>)}
      </Stack>

      <HStack position="relative">
        <InfoOutlineIcon color='gray.300' position="absolute" zIndex="1" left="10px" />
        <AsyncSelect 
          defaultOptions 
          loadOptions={loadCities} 
          styles={selectStyles} 
          placeholder="Select the City" 
          onChange={e => {if (e) setCity(e)}}
          defaultValue={city}
        />
      </HStack>

      {city?.label && (
        <Flex alignItems="center" justifyContent="flex-end">
          {weather ? (
            <>
              <Text>Weather: {weather.description}</Text>
              <Image
                paddingLeft={2}
                src={`/images/weather/${weather.iconName}.png`}
                alt={`${weather.description} icon`}
              />
            </>
          ) : (<Text>Weather not found for this location/day</Text>)}  
        </Flex>
      )}

      <Stack>
        <Text color="gray.500">Pick a color for this reminder</Text>
        <HStack justifyContent="center">
          {availableColors.map(color => (
            <Circle 
              key={color} 
              bg={color} 
              cursor="pointer"
              border={color === colorSelected ? '4px solid #aaa' : '4px solid #fff'}
              size="40px"
              onClick={() => setColorSelected(color)}
            />
          ))}
        </HStack>
      </Stack>
      
      <Flex justifyContent="flex-end">
        <Button onClick={onCancel}>Cancel</Button>
        <Button
          colorScheme='blue'
          ml={2}
          onClick={onSaveClick}
          type="submit"
        >
          Save
        </Button>
      </Flex>

    </Stack>
  );
}
