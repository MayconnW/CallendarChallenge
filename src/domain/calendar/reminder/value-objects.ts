import { validateDescription, validateTime } from './value-validators';
import { ValueObject } from 'domain/core/value-object';
import { DescriptionFailureTypes, TimeFailureTypes } from './failure';

export class Description extends ValueObject<string, DescriptionFailureTypes> {
  constructor(input: string) {
    super(validateDescription(input));
  }
}

export class Time extends ValueObject<string, TimeFailureTypes> {
  constructor(input: string) {
    super(validateTime(input));
  }
}
