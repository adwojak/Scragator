// @flow
import * as React from "react";
import Enzyme, { ReactWrapper, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { wrapComponent } from "../../../helpers/wrapper";
import type { NewParamsType } from "../../helpers/wrapper";
import Input from "../../../libs/componentsOld/Input";
import EmailValidator from "../../../libs/validators/EmailValidator";

Enzyme.configure({ adapter: new Adapter() });

const setupInputComponent = (newParams: NewParamsType = {}): ReactWrapper => {
  return wrapComponent(Input, newParams);
};

describe("Input component", () => {
  const inputText = "text";
  const emptyInputText = "";

  it("Component renders properly", () => {
    expect(setupInputComponent().length).toEqual(1);
  });

  it("Simulate input change", () => {
    const inputComponent = mount(<Input />);
    inputComponent.simulate("change", { target: { value: inputText } });
    expect(inputComponent.find("input").prop("value")).toEqual(inputText);
  });

  it("Simulate input enter keydown", () => {
    const inputComponent = mount(<Input setInputData={jest.fn()} />);
    inputComponent.simulate("change", { target: { value: inputText } });
    inputComponent.simulate("keydown", { keyCode: 13 });
    expect(inputComponent.find("input").prop("value")).toEqual(inputText);
  });

  it("Simulate input other keydown", () => {
    const inputComponent = mount(<Input />);
    inputComponent.simulate("keydown", { keyCode: 14 });
  });

  it("Simulate input blur (email validation) - success", () => {
    const inputComponent = mount(
      <Input setInputData={jest.fn()} validator={EmailValidator} />
    );
    inputComponent.simulate("change", { target: { value: inputText } });
    inputComponent.simulate("blur");
    expect(inputComponent.find("input").prop("value")).toEqual(inputText);
  });

  it("Simulate input blur (missing validator) - failure", () => {
    const inputComponent = mount(<Input setInputData={jest.fn()} />);
    inputComponent.simulate("change", { target: { value: emptyInputText } });
    inputComponent.simulate("blur");
    expect(inputComponent.find("input").prop("value")).toEqual(emptyInputText);
  });
});
