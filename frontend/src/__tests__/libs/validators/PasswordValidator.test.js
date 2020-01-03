// @flow
import PasswordValidator from '../../../libs/validators/PasswordValidator';

describe('Password validator', () => {
  const tooShortValue = 'passwor';
  const tooLongValue = 'v'.repeat(33);
  const validPassword = 'password';

  const MIN_LENGTH = 8;
  const MAX_LENGTH = 32;

  const TOO_SHORT = `Password too short! Minimum ${ MIN_LENGTH } characters length.`;
  const TOO_LONG = `Password too long! Maximum ${ MAX_LENGTH } characters length.`;

  it('Value too short', () => {
    expect(PasswordValidator(tooShortValue)).toEqual(
      expect.arrayContaining([ TOO_SHORT, true ])
    );
  });

  it('Value too long', () => {
    expect(PasswordValidator(tooLongValue)).toEqual(
      expect.arrayContaining([ TOO_LONG, true ])
    );
  });

  it('Valid password', () => {
    expect(PasswordValidator(validPassword)).toEqual(
      expect.arrayContaining([ '', false ])
    );
  });
});
