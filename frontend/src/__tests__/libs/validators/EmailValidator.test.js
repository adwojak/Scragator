// @flow
import EmailValidator from '../../../libs/validators/EmailValidator';

describe('Email validator', () => {
  const tooShortValue = 'val';
  const tooLongValue = 'v'.repeat(65);
  const invalidEmail = 'example@asd.12';
  const validEmail = 'example@asd.com';

  const TOO_SHORT = 'Too short';
  const TOO_LONG = 'Too long';
  const REGEX_ERROR = 'Invalid email';

  it('Value too short', () => {
    expect(EmailValidator(tooShortValue)).toEqual(
      expect.arrayContaining([ TOO_SHORT, true ])
    );
  });

  it('Value too long', () => {
    expect(EmailValidator(tooLongValue)).toEqual(
      expect.arrayContaining([ TOO_LONG, true ])
    );
  });

  it('Invalid email', () => {
    expect(EmailValidator(invalidEmail)).toEqual(
      expect.arrayContaining([ REGEX_ERROR, true ])
    );
  });

  it('Valid email', () => {
    expect(EmailValidator(validEmail)).toEqual(
      expect.arrayContaining([ '', false ])
    );
  });
});
