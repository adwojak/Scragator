// @flow
export default function EmailValidator(value: string): Array {
  const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const TOO_SHORT = "Too short";
  const TOO_LONG = "Too long";
  const REGEX_ERROR = "Invalid email";

  const MIN_LENGTH = 5;
  const MAX_LENGTH = 64;

  if (value.length <= MIN_LENGTH) {
    return [TOO_SHORT, true];
  } else if (value.length >= MAX_LENGTH) {
    return [TOO_LONG, true];
  } else if (!emailRegex.test(value)) {
    return [REGEX_ERROR, true];
  }
  return ["", false];
}
