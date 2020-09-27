// @flow
import React from "react";
import Enzyme, { ReactWrapper } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { wrapComponent } from "../../../helpers/wrapper";
import type { NewParamsType } from "../../../helpers/wrapper";
import Form from "../../../libs/componentsOld/Form";

Enzyme.configure({ adapter: new Adapter() });

const setupFormComponent = (newParams: NewParamsType = {}): ReactWrapper => {
  return wrapComponent(Form, newParams);
};

describe("Form", () => {
  const event = new Event({});
  const formInputs = ["input"];
  const defaultInputData = {
    [formInputs[0]]: {
      value: null,
      hasError: true
    }
  };
  const inputDataAfterUpdate = {
    [formInputs[0]]: {
      value: "value",
      hasError: false
    }
  };
  const dataToUpdate = {
    id: formInputs[0],
    value: "value",
    hasError: false
  };

  const createInstanceWithState = (forms: Array = formInputs): Form => {
    const formInstance = setupFormComponent().instance();
    formInstance.state = formInstance.createLocalState(forms);
    return formInstance;
  };

  it("Component renders properly", () => {
    expect(setupFormComponent().length).toEqual(1);
  });

  it("Create local state", () => {
    const formInstance = createInstanceWithState();
    expect(formInstance.state).toMatchObject(defaultInputData, {
      defaultFormInputs: formInputs
    });
  });

  it("Set input data", () => {
    const formInstance = createInstanceWithState();
    formInstance.setInputData(dataToUpdate, false);
    expect(formInstance.state).toMatchObject(inputDataAfterUpdate, {
      defaultFormInputs: formInputs
    });
  });

  it("Handle submit - failure", () => {
    const formInstance = createInstanceWithState();
    formInstance.handleSubmit(event);
  });

  it("Handle submit - success", () => {
    const formInstance = createInstanceWithState();
    formInstance.setInputData(dataToUpdate, false);
    expect((): null => formInstance.handleSubmit(event)).toThrow();
  });

  it("Handle submit - repeat passwords", () => {
    const formInstance = createInstanceWithState([
      "password",
      "repeatPassword"
    ]);
    formInstance.setInputData(
      {
        id: "password",
        value: "examplePassword",
        hasError: false
      },
      false
    );
    formInstance.setInputData(
      {
        id: "repeatPassword",
        value: "notMatchingPassword",
        hasError: false
      },
      false
    );
    formInstance.checkForFormErrors();
    expect(formInstance.state.formError).toBe("Passwords are not same!");
  });

  it("Handle submit - same passwords", () => {
    const formInstance = createInstanceWithState([
      "password",
      "repeatPassword"
    ]);
    formInstance.setInputData(
      {
        id: "password",
        value: "examplePassword",
        hasError: false
      },
      false
    );
    formInstance.setInputData(
      {
        id: "repeatPassword",
        value: "examplePassword",
        hasError: false
      },
      false
    );
    formInstance.checkForFormErrors();
    expect(formInstance.state.formError).toBe("");
  });
});
