import { Reminder } from "domain/calendar/reminder/types";

export type DayInCalendar = {
  id: string;
  date?: Date;
  day: string;
  reminders?: Reminder[];
}