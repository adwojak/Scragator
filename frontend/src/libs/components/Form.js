// @flow
import * as React from "react";

export default class Form extends React.Component {
  defaultPasswordIds = ["password", "repeatPassword"];

  createLocalState = (
    formInputs: Array,
    additionalStateProperties: Object
  ): Object => {
    const localState = Object.assign(
      {},
      ...formInputs.map((input: string): null => this.singleStateEntry(input))
    );
    return Object.assign({}, localState, additionalStateProperties, {
      defaultFormInputs: formInputs,
      formError: ""
    });
  };

  singleStateEntry = (id: string): Object => {
    return {
      [id]: {
        value: null,
        hasError: true
      }
    };
  };

  checkForFormErrors = (): boolean => {
    this.setState({
      formError: ""
    });
    const formWithPasswordRepeat = this.defaultPasswordIds
      .map((val: string): boolean => this.state.defaultFormInputs.includes(val))
      .every((val: boolean): boolean => val === true);
    if (formWithPasswordRepeat) {
      const passwordsSame = this.defaultPasswordIds
        .map((input: string): string => this.state[input].value)
        .every((val: string, i: number, arr: Array): boolean => val === arr[0]);
      if (!passwordsSame) {
        this.setState({
          formError: "Passwords are not same!"
        });
        return true;
      }
    }
    return false;
  };

  hasErrors = (): boolean => {
    const hasInputErrors = this.state.defaultFormInputs
      .map((input: string): null => this.state[input].hasError)
      .includes(true);
    const hasFormErrors = this.checkForFormErrors();
    if (hasInputErrors || hasFormErrors) {
      return true;
    }
    return false;
  };

  setInputData = (data: Object, hasError: boolean): null => {
    this.setState({
      [data.id]: {
        value: data.value,
        hasError: hasError
      }
    });
  };

  handleSubmit = (event: Event): null => {
    event.preventDefault();
    if (!this.hasErrors()) {
      this.executeValidFormSubmit();
    }
  };

  executeValidFormSubmit = (): null => {
    throw new Error(
      "Form needs an implementation of that function for handling submit!"
    );
  };

  render(): null {
    return null;
  }
}
