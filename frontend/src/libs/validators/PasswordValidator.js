// @flow
export default function PasswordValidator(value: string): Array {
    const MIN_LENGTH = 8;
    const MAX_LENGTH = 32;

    const TOO_SHORT = `Password too short! Minimum ${ MIN_LENGTH } characters length.`;
    const TOO_LONG = `Password too long! Maximum ${ MAX_LENGTH } characters length.`;

    if (value.length < MIN_LENGTH) {
        return [ TOO_SHORT, true ];
    } else if (value.length > MAX_LENGTH) {
        return [ TOO_LONG, true ];
    }
    return [ '', false ];
};