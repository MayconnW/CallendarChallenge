import { DescriptionFailureTypes, TimeFailureTypes } from './failure';
import { validateDescription, validateTime } from './value-validators';

describe('Calendar/reminder -> Validators', () => {
  describe('Description', () => {
    it('should return empty description', () => {
      const description = validateDescription('');
      expect(description.isLeft()).toEqual(true);
      const extracted = description.leftToMaybe().extract();
      expect(extracted?.type).toEqual(DescriptionFailureTypes.emptyDescription);
    });

    it('should return invalid description', () => {
      const description = validateDescription('I have more than 30 characteres, so I\'m doing a mess here!');
      expect(description.isLeft()).toEqual(true);
      const extracted = description.leftToMaybe().extract();
      expect(extracted?.type).toEqual(DescriptionFailureTypes.descriptionToLong);
    });

    it('should return valid description', () => {
      const expectedDescription = 'Good Description';
      const description = validateDescription(expectedDescription);
      expect(description.isRight()).toEqual(true);
      const extracted = description.extract();
      expect(extracted).toEqual(expectedDescription);
    });
    
  });

  describe('Time', () => {
    it('should return empty time', () => {
      const time = validateTime('');
      expect(time.isLeft()).toEqual(true);
      const extracted = time.leftToMaybe().extract();
      expect(extracted?.type).toEqual(TimeFailureTypes.emptyTime);
    });

    it('should return invalid time', () => {
      const time = validateTime('175:148');
      expect(time.isLeft()).toEqual(true);
      const extracted = time.leftToMaybe().extract();
      expect(extracted?.type).toEqual(TimeFailureTypes.invalidTimeFormat);
    });

    it('should return valid time', () => {
      const expectedTime = '10:15';
      const time = validateTime(expectedTime);
      expect(time.isRight()).toEqual(true);
      const extracted = time.extract();
      expect(extracted).toEqual(expectedTime);
    });
    
  });

});
