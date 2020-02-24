// @flow
import React from "react";
import Enzyme, { ReactWrapper } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { wrapComponent } from "../../helpers/wrapper";
import type { NewParamsType } from "../../helpers/wrapper";
import Login from "../../components/Login";

Enzyme.configure({ adapter: new Adapter() });

const setupLoginComponent = (newParams: NewParamsType = {}): ReactWrapper => {
  return wrapComponent(Login, newParams);
};

describe("Login", () => {
  const formInputs = ["email", "password"];
  const stateData = {
    [formInputs[0]]: {
      value: null,
      hasError: true
    },
    [formInputs[1]]: {
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
    expect(setupLoginComponent().length).toEqual(1);
  });

  it("Create local state", () => {
    const loginInstance = setupLoginComponent()
      .dive()
      .instance();
    loginInstance.createLocalState(formInputs);
    expect(loginInstance.state).toMatchObject(stateData, {
      defaultFormInputs: formInputs
    });
  });

  it("Submit form", () => {
    const loginInstance = setupLoginComponent()
      .dive()
      .instance();
    loginInstance.createLocalState(formInputs);

    loginInstance.setInputData(emailDataToUpdate, false);
    loginInstance.setInputData(passwordDataToUpdate, false);
    loginInstance.executeValidFormSubmit();
  });
});
