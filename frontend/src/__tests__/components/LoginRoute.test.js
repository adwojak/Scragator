// @flow
import React from "react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import Enzyme, { ReactWrapper, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import configureStore from "redux-mock-store";
import LoginRoute from "../../components/LoginRoute";
import configureMockStore from "redux-mock-store";

Enzyme.configure({ adapter: new Adapter() });

const mockStore = configureMockStore();
const store = {
  isLogged: true,
  burgerMenuVisible: false
};

const ExampleComponent = () => {
  return <p></p>;
};

const setupLoginRouteComponent = newStore => {
  return mount(
    <Provider store={mockStore(Object.assign({}, store, newStore))}>
      <MemoryRouter>
        <LoginRoute path="/example" component={ExampleComponent} />
      </MemoryRouter>
    </Provider>
  );
};

describe("Login route", () => {
  it("Component renders properly - logged", () => {
    expect(setupLoginRouteComponent().length).toEqual(1);
  });

  it("Component renders properly - not logged", () => {
    expect(setupLoginRouteComponent({ isLogged: false }).length).toEqual(1);
  });
});
