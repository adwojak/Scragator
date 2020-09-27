// @flow
import * as React from "react";
import Enzyme, { ReactWrapper, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { wrapComponent } from "../../../helpers/wrapper";
import type { NewParamsType } from "../../helpers/wrapper";
import Button from "../../../libs/componentsOld/Button";

Enzyme.configure({ adapter: new Adapter() });

const setupButtonComponent = (newParams: NewParamsType = {}): ReactWrapper => {
  return wrapComponent(Button, newParams);
};

describe("Button component", () => {
  it("Component renders properly", () => {
    expect(setupButtonComponent().length).toEqual(1);
  });
});
