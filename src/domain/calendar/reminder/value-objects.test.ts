import { DescriptionFailureTypes, TimeFailureTypes } from './failure';
import { Description, Time } from './value-objects';

describe('Calendar/Reminder -> Value Objects', () => {
  describe('Description', () => {
    it('should return Description can not be empty', () => {
      const expectedValue = '';
      const description = new Description(expectedValue);
      expect(description.isValid()).toEqual(false);
      expect(description.getValueOrFailedValue()).toEqual(expectedValue);
      expect(description.getErrorType().extract()).toEqual(DescriptionFailureTypes.emptyDescription);
    });

    it('should return Description can not have more than 30 characteres', () => {
      const expectedValue = 'I have more than 30 characteres, so I\'m doing a mess here!';
      const description = new Description(expectedValue);
      expect(description.isValid()).toEqual(false);
      expect(description.getValueOrFailedValue()).toEqual(expectedValue);
      expect(description.getErrorType().extract()).toEqual(DescriptionFailureTypes.descriptionToLong);
    });

    it('should return valid Description', () => {
      const expectedValue = 'I am a good description';
      const description = new Description(expectedValue);
      expect(description.isValid()).toEqual(true);
      expect(description.getValueOrFailedValue()).toEqual(expectedValue);
      expect(description.getOrCrash()).toEqual(expectedValue);
    });
  });

  describe('Time', () => {
    it('should return Description can not be empty', () => {
      const expectedValue = '';
      const time = new Time(expectedValue);
      expect(time.isValid()).toEqual(false);
      expect(time.getValueOrFailedValue()).toEqual(expectedValue);
      expect(time.getErrorType().extract()).toEqual(TimeFailureTypes.emptyTime);
    });

    it('should return invalid time', () => {
      const expectedInvalidTimeValue1 = '13:15';
      const expectedInvalidTimeValue2 = '-7:15';
      const expectedInvalidTimeValue3 = '05:65';
      const expectedInvalidTimeValue4 = '1315';
      const expectedInvalidTimeValue5 = 'aa:15';
      const expectedInvalidTimeValue6 = '0987';
      const expectedInvalidTimeValue7 = '11:12:13';
      const expectedInvalidTimeValue8 = '12:aa';
      const expectedInvalidTimeValue9 = 'aa:aa';
      const expectedInvalidTimeValue10 = '11:97';
      const expectedInvalidTimeValue11 = '112:112';
      
      expect((new Time(expectedInvalidTimeValue2)).isValid()).toEqual(false);
      expect((new Time(expectedInvalidTimeValue3)).isValid()).toEqual(false);
      expect((new Time(expectedInvalidTimeValue4)).isValid()).toEqual(false);
      expect((new Time(expectedInvalidTimeValue5)).isValid()).toEqual(false);
      expect((new Time(expectedInvalidTimeValue6)).isValid()).toEqual(false);
      expect((new Time(expectedInvalidTimeValue7)).isValid()).toEqual(false);
      expect((new Time(expectedInvalidTimeValue8)).isValid()).toEqual(false);
      expect((new Time(expectedInvalidTimeValue9)).isValid()).toEqual(false);
      expect((new Time(expectedInvalidTimeValue10)).isValid()).toEqual(false);
      expect((new Time(expectedInvalidTimeValue11)).isValid()).toEqual(false);

      const time = new Time(expectedInvalidTimeValue1);
      expect(time.isValid()).toEqual(false);
      expect(time.getValueOrFailedValue()).toEqual(expectedInvalidTimeValue1);
      expect(time.getErrorType().extract()).toEqual(TimeFailureTypes.invalidTimeFormat);
    });

    it('should return valid Time', () => {
      const expectedValue = '10:15';
      const time = new Time(expectedValue);
      expect(time.isValid()).toEqual(true);
      expect(time.getValueOrFailedValue()).toEqual(expectedValue);
      expect(time.getOrCrash()).toEqual(expectedValue);
    });
  });

});
