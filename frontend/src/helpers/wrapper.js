import * as React from 'react';
import { shallow, mount } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import { MemoryRouter } from 'react-router-dom';

export const SHALLOW = 'shallow';
export const MOUNT = 'mount';
const mockStore = configureMockStore();

const shallowComponent = (component) => {
    return shallow(component);
};

const mountComponent = (component) => {
    return mount(
        <MemoryRouter>
            {component}
        </MemoryRouter>
    );
};

const params = {
    wrapperType: SHALLOW,
    store: {
        isLogged: true,
        burgerMenuVisible: false
    },
    props: {}
};

const assignNewParams = (newParams) => {
    return Object.assign({}, params, newParams);
};

export const wrapComponent = (Component, newParams) => {
    const params = assignNewParams(newParams);
    const {wrapperType, store, props} = params;
    const component = <Component store={mockStore(store)} {...props} />;

    if (wrapperType === 'shallow') {
        return shallowComponent(component);
    } else if (wrapperType === 'mount') {
        return mountComponent(component);
    } else {
        return null;
    }
};
