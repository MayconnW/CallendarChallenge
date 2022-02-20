import { Either, Right, Left } from 'purify-ts/Either';
import { DescriptionFailure, TimeFailure } from './failure';

export const validateDescription = (input: string): Either<DescriptionFailure, string> => {
  if (!input) {
    return Left(DescriptionFailure.emptyDescription(input));
  }

  if (input.length > 30) {
    return Left(DescriptionFailure.descriptionToLong(input));
  }

  return Right(input);
};

export const validateTime = (input: string): Either<TimeFailure, string> => {
  if (!input) {
    return Left(TimeFailure.emptyTime(input));
  }

  try {
    const splittedTime = input.split(':');
    if (splittedTime.length !== 2) {
      return Left(TimeFailure.invalidTimeFormat(input));
    }

    const [firstHalf, secondHalf] = splittedTime;
    const firstHalfInt = parseInt(firstHalf);
    const secondHalfInt = parseInt(secondHalf);

    if (isNaN(firstHalfInt) || firstHalfInt > 12 || firstHalfInt < 0) {
      return Left(TimeFailure.invalidTimeFormat(input));
    }
    if (isNaN(secondHalfInt) || secondHalfInt > 59 || secondHalfInt < 0) {
      return Left(TimeFailure.invalidTimeFormat(input));
    }
    if (secondHalf.length !== 2) {
      return Left(TimeFailure.invalidTimeFormat(input));
    }

    return Right(`${firstHalf.padStart(2, '0')}:${secondHalf.padStart(2, '0')}`);

  } catch {
    return Left(TimeFailure.invalidTimeFormat(input));
  }
};
