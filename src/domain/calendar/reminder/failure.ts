import { Failure } from 'domain/core/failure';

export enum DescriptionFailureTypes {
  descriptionToLong,
  emptyDescription,
}

export enum TimeFailureTypes {
  invalidTimeFormat,
  emptyTime,
}

export class DescriptionFailure extends Failure<DescriptionFailureTypes, string> {
  private constructor(errorMessage: string, errorType: DescriptionFailureTypes, failedValue: string) {
    super(errorMessage, errorType, failedValue);
  }

  public static descriptionToLong(failedValue: string) {
    return new DescriptionFailure(
      'Description should not have more than 30 characteres',
      DescriptionFailureTypes.descriptionToLong,
      failedValue
    );
  }

  public static emptyDescription(failedValue: string) {
    return new DescriptionFailure('Description should not be empty', DescriptionFailureTypes.emptyDescription, failedValue);
  }
}

export class TimeFailure extends Failure<TimeFailureTypes, string> {
  private constructor(errorMessage: string, errorType: TimeFailureTypes, failedValue: string) {
    super(errorMessage, errorType, failedValue);
  }

  public static invalidTimeFormat(failedValue: string) {
    return new TimeFailure('Invalid time format, the correct format is hh:mm (10:15)', TimeFailureTypes.invalidTimeFormat, failedValue);
  }

  public static emptyTime(failedValue: string) {
    return new TimeFailure('Time should not be empty', TimeFailureTypes.emptyTime, failedValue);
  }
}
