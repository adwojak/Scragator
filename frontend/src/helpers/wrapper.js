// @flow
import * as React from 'react';
import { shallow, mount, ReactWrapper } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import { MemoryRouter } from 'react-router-dom';

export const SHALLOW: string = 'shallow';
export const MOUNT: string = 'mount';
const mockStore = configureMockStore();

const shallowComponent = (component: React.Node): ReactWrapper => {
    return shallow(component);
};

const mountComponent = (component: React.Node): ReactWrapper => {
    return mount(
        <MemoryRouter>
            {component}
        </MemoryRouter>
    );
};

const defaultParams = {
    wrapperType: SHALLOW,
    store: {
        isLogged: true,
        burgerMenuVisible: false
    },
    props: {}
};

export type NewParamsType = $ReadOnly<{|
    wrapperType?: string,
    store?: Object,
    props?: Object
|}>;

const assignNewParams = (newParams: NewParamsType): Object => {
    return Object.assign({}, defaultParams, newParams);
};

export const wrapComponent = (Component: React.Node, newParams: Object): ReactWrapper => {
    const params = assignNewParams(newParams);
    const { wrapperType, store, props } = params;
    const component = <Component store={ mockStore(store) } { ...props } />;

    if (wrapperType === 'shallow') {
        return shallowComponent(component);
    } else if (wrapperType === 'mount') {
        return mountComponent(component);
    }
};
