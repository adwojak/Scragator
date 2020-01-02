// @flow
import * as React from 'react';

export default class Form extends React.Component {

    createLocalState = (formInputs: Array, additionalStateProperties: Object): Object => {
        const localState = Object.assign({}, ...formInputs.map((input: string): null => this.singleStateEntry(input)));
        return Object.assign({}, localState, additionalStateProperties, { defaultFormInputs: formInputs });
    }

    singleStateEntry = (id: string): Object => {
        return {
            [ id ]: {
                value: null,
                hasError: true
            }
        };
    }

    hasFormErrors = (): boolean => {
        return this.state.defaultFormInputs.map((input: string): null => this.state[ input ].hasError).includes(true);
    }

    setInputData = (data: Object, hasError: boolean): null => {
        this.setState({
            [ data.id ]: {
                value: data.value,
                hasError: hasError
            }
        });
    }

    handleSubmit = (event: Event): null => {
        event.preventDefault();
        if (!this.hasFormErrors()) {
            this.executeValidFormSubmit();
        }
    }

    executeValidFormSubmit = (): null => {
        throw new Error('Form needs an implementation of that function for handling submit!')
    }

    render(): null {
        return null;
    }
}