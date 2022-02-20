import {
  getDaysInMonth, startOfMonth, format, endOfMonth, subMonths, eachDayOfInterval 
} from 'date-fns';
import { DayInCalendar } from './types';

export const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];

export const getMonthDaysInArray = (selectedMonth: Date):DayInCalendar[] => {
  const dayNameStartOfMonth = format(startOfMonth(selectedMonth), 'EEEE');
  const daysOfTheLastMonthToShow = days.indexOf(dayNameStartOfMonth.toLowerCase());
  const lastMonthNumberOfDays = getDaysInMonth(subMonths(selectedMonth, 1));
  const arrStart = (Array.from(Array(daysOfTheLastMonthToShow), (_, k) => ({day: `${lastMonthNumberOfDays - k}`, id: `start-${k}`}))).reverse();

  const dayNameEndOfMonth = format(endOfMonth(selectedMonth), 'EEEE');
  const daysOfTheNextMonthToShow = 6 - days.indexOf(dayNameEndOfMonth.toLowerCase());
  const arrEnd = Array.from(Array(daysOfTheNextMonthToShow), (_, k) => ({day: `${k+1}`, id: `end-${k}`}));

  const currentMonthArr: DayInCalendar[] = eachDayOfInterval({start: startOfMonth(selectedMonth), end: endOfMonth(selectedMonth)})
    .map(date => ({
      date,
      day: format(date, 'd'),
      reminders: [],
      id: format(date, 'MMMM-dd')
    }));

  return [...arrStart, ...currentMonthArr, ...arrEnd];
}
