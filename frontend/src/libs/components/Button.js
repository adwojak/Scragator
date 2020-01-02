// @flow
import * as React from 'react';

type ButtonType = $ReadOnly<{|
    buttonText: string,
    disabled?: boolean
|}>;

export default function Button(props: ButtonType): React.Node {
    const { buttonText, disabled } = props;
    return (
        <button
            disabled={ disabled || false }
        >
            {buttonText}
        </button>
    )
}
