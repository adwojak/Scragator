// @flow
import React from "react";
import Enzyme, { ReactWrapper } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { wrapComponent, MOUNT } from "../../helpers/wrapper";
// import type { NewParamsType } from "../../../helpers/wrapper";

Enzyme.configure({ adapter: new Adapter() });

describe("Wrapper for tests", () => {
  class SampleComponent extends React.Component {
    render(): React.Node {
      return (
        <form>
          <label>Example</label>
        </form>
      );
    }
  }

  it("Shallow wrap component", () => {
    wrapComponent(SampleComponent);
  });

  it("Mount wrap component", () => {
    wrapComponent(SampleComponent, { wrapperType: MOUNT });
  });
});
