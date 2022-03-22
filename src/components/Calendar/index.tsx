import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
 MainContainer, MonthSelectContainer, CalendarContainer, RemindersContainer, ReminderContainer, DayContainer, ActionButton 
} from './styles';
import { format,  addMonths, subMonths } from 'date-fns';
import Modal from '../Modal';
import ReminderForm from '../ReminderForm';
import { Reminder } from 'domain/calendar/reminder/types';
import { AddIcon, ArrowRightIcon, ArrowLeftIcon } from '@chakra-ui/icons';
import { DayInCalendar } from './types';
import { getMonthDaysInArray, days } from './util';

export default function Calendar() {

  const [isModalOpened, setIsModalOpened] = useState(false);

  const [selectedMonth, setSelectedMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<DayInCalendar | null>(null);

  const [formattedDate, setFormattedDate] = useState('');
  const [daysToShow, setDaysToShow] = useState<DayInCalendar[]>([]);
  const [reminderSelected, setReminderSelected] = useState<Reminder | undefined>(undefined);

  const [reminders, setReminders] = useState<Reminder[]>([]);

  useEffect(() => {
    if (!isModalOpened){
      setReminderSelected(undefined);
    }
  }, [isModalOpened])

  useEffect(() => {
    const arr = getMonthDaysInArray(selectedMonth);
    
    setDaysToShow(arr);
    //setSelectedDate(null);
    setFormattedDate(format(selectedMonth, 'MMMM/yyyy'));

  }, [selectedMonth]);

  const nextMonth = useCallback(() => {
    setSelectedMonth(currentDate => addMonths(currentDate, 1));
  }, []);

  const previousMonth = useCallback(() => {
    setSelectedMonth(currentDate => subMonths(currentDate, 1));
  }, []);

  const onDateClick = useCallback((props: DayInCalendar) => {
    if (props.date) {
      setSelectedDate(props);
    }
  }, []);

  const onAddReminderClick = useCallback(() => {
    setIsModalOpened(true);
  }, []);

  const onReminderClick = useCallback((reminder: Reminder) => {
    setReminderSelected(reminder)
    setIsModalOpened(true);
  }, []);

  const calendarDays = useMemo(() => (
    <>
      {daysToShow.map((item) => (
        <DayContainer 
          key={item.id}
          onClick={() => onDateClick(item)}
          selected={item.id === selectedDate?.id}
          disabled={!item.date}
        >
          <span>{item.day}</span>
          <RemindersContainer>
            {item.reminders?.map(reminder => (
              <ReminderContainer 
                key={`item-${reminder.description.getOrCrash()}-${reminder.time.getOrCrash()}`}
                onClick={() => onReminderClick(reminder)}
                color={reminder.color} 
              >
                {reminder.description.getOrCrash()}
              </ReminderContainer>
            ))}
          </RemindersContainer>
          {item.id === selectedDate?.id && 
            (
              <ActionButton onClick={() => onAddReminderClick()}>
                <AddIcon />
              </ActionButton>
            )
          }
        </DayContainer>
      ))}
    </>
  ), [daysToShow, onDateClick, selectedDate, onAddReminderClick, onReminderClick]);

  

  const onSave = useCallback((reminder: Reminder) => {
    setReminders((currentState) => {
      return [
        ...currentState.filter((i) => i.id !== reminder.id),
        reminder
      ].sort((itemA, itemB) =>
        parseInt(
          [
            itemA.amPm === 'am' ? '1' : '2',
            ...itemA.time.getOrCrash().split(':')
          ].join('')
        ) >
        parseInt(
          [
            itemB.amPm === 'am' ? '1' : '2',
            ...itemB.time.getOrCrash().split(':')
          ].join('')
        )
          ? 1
          : -1
      );
    });
    setIsModalOpened(false);
  }, []);

  useEffect(() => {
    setDaysToShow(currentState => {
      return currentState.map(item => {
        if (item.date) {
          item.reminders = reminders.filter(i => format(i.date, 'dd/MM') === format(item.date ?? 0, 'dd/MM'));
        }
        return item;
      })
    })
    setIsModalOpened(false);
  }, [reminders, selectedMonth]);
  
  const onCancel = useCallback(() => {
    setIsModalOpened(false);
  }, []);
  
  return (
    <MainContainer>
      <MonthSelectContainer>
        <button type="button" onClick={previousMonth}><ArrowLeftIcon /></button>
        <h3>
          {formattedDate}
        </h3>
        <button type="button" onClick={nextMonth}><ArrowRightIcon /></button>
      </MonthSelectContainer>
      <CalendarContainer>
        {days.map(day => (
          <p key={`day-${day}`}>
            <span>{day}</span>
          </p>
        ))}
        {calendarDays}
      </CalendarContainer>
      <Modal
        isOpen={isModalOpened}
        onRequestClose={() => setIsModalOpened(false)}
      >
        {selectedDate?.date && (
          <ReminderForm onCancel={onCancel} onSave={onSave} date={selectedDate.date} reminder={reminderSelected}/>
        )}
      </Modal>
    </MainContainer>
  );
}
