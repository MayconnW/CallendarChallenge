import { City } from "services";
import { Description, Time } from "./value-objects";

export type Reminder = {
  id: string;
  description: Description;
  time: Time;
  amPm: 'am' | 'pm';
  date: Date;
  city: City | null;
  color: string;
};
