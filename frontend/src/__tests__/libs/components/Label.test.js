// @flow
import * as React from "react";
import Enzyme, { ReactWrapper, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { wrapComponent } from "../../../helpers/wrapper";
import type { NewParamsType } from "../../helpers/wrapper";
import Label from "../../../libs/components/Label";

Enzyme.configure({ adapter: new Adapter() });

const setupLabelComponent = (newParams: NewParamsType = {}): ReactWrapper => {
  return wrapComponent(Label, newParams);
};

describe("Label component", () => {
  it("Component renders properly", () => {
    expect(setupLabelComponent().length).toEqual(1);
  });
});
