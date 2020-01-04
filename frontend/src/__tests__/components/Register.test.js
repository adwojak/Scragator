// @flow
import React from "react";
import Enzyme, { ReactWrapper } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { wrapComponent } from "../../helpers/wrapper";
import type { NewParamsType } from "../../helpers/wrapper";
import Register from "../../components/Register";

Enzyme.configure({ adapter: new Adapter() });

const setupRegisterComponent = (
  newParams: NewParamsType = {}
): ReactWrapper => {
  return wrapComponent(Register, newParams);
};

describe("Register", () => {
  const event = new Event({});
  const formInputs = ["email", "password", "repeatPassword"];
  const stateData = {
    [formInputs[0]]: {
      value: null,
      hasError: true
    },
    [formInputs[1]]: {
      value: null,
      hasError: true
    },
    [formInputs[2]]: {
      value: null,
      hasError: true
    }
  };
  const emailDataToUpdate = {
    id: formInputs[0],
    value: "example.asd@com",
    hasError: false
  };
  const passwordDataToUpdate = {
    id: formInputs[1],
    value: "examplePassword",
    hasError: false
  };

  it("Component renders properly", () => {
    expect(setupRegisterComponent().length).toEqual(1);
  });

  it("Create local state", () => {
    const registerInstance = setupRegisterComponent()
      .dive()
      .instance();
    registerInstance.createLocalState(formInputs);
    expect(registerInstance.state).toMatchObject(stateData, {
      defaultFormInputs: formInputs,
      formError: ""
    });
  });

  it("Submit form", () => {
    const registerInstance = setupRegisterComponent()
      .dive()
      .instance();
    registerInstance.createLocalState(formInputs);

    registerInstance.setInputData(emailDataToUpdate, false);
    registerInstance.setInputData(passwordDataToUpdate, false);
    registerInstance.setInputData(
      Object.assign({}, passwordDataToUpdate, {
        id: formInputs[2]
      }),
      false
    );
    registerInstance.executeValidFormSubmit();
  });

  it("Submit form - password not match", () => {
    const registerInstance = setupRegisterComponent()
      .dive()
      .instance();
    registerInstance.createLocalState(formInputs);

    registerInstance.setInputData(emailDataToUpdate, false);
    registerInstance.setInputData(passwordDataToUpdate, false);
    registerInstance.setInputData(
      Object.assign({}, passwordDataToUpdate, {
        id: formInputs[2],
        value: "notMatchingPassword"
      }),
      false
    );
    registerInstance.handleSubmit(event);
    // registerInstance.executeValidFormSubmit();
  });
});
