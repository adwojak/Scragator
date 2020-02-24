// @flow
import React from "react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import Enzyme, { ReactWrapper, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import configureStore from "redux-mock-store";
import AnonymousRoute from "../../components/AnonymousRoute";
import configureMockStore from "redux-mock-store";

Enzyme.configure({ adapter: new Adapter() });

const mockStore = configureMockStore();
const store = {
  isLogged: true,
  burgerMenuVisible: false
};

const ExampleComponent = (): React.Node => {
  return <p></p>;
};

const setupAnonymousRouteComponent = (newStore: Object): ReactWrapper => {
  return mount(
    <Provider store={mockStore(Object.assign({}, store, newStore))}>
      <MemoryRouter>
        <AnonymousRoute path="/example" component={ExampleComponent} />
      </MemoryRouter>
    </Provider>
  );
};

describe("Anonymous route", () => {
  it("Component renders properly - logged", () => {
    expect(setupAnonymousRouteComponent().length).toEqual(1);
  });

  it("Component renders properly - not logged", () => {
    expect(setupAnonymousRouteComponent({ isLogged: false }).length).toEqual(1);
  });
});
