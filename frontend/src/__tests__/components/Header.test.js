// @flow
import React from 'react';
import Enzyme, { ReactWrapper } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { wrapComponent, MOUNT } from '../../helpers/wrapper';
import type { NewParamsType } from '../../helpers/wrapper';
import Header, { HeaderIcon, HeaderTitle, HeaderSearchBar, HeaderNavbar } from '../../components/Header';

Enzyme.configure({ adapter: new Adapter() });

const setupHeaderComponent = (newParams: NewParamsType = {}): ReactWrapper => {
    return wrapComponent(Header, newParams);
};

const setupHeaderIconComponent = (newParams: NewParamsType = {}): ReactWrapper => {
    return wrapComponent(HeaderIcon, newParams);
};

const setupHeaderTitleComponent = (newParams: NewParamsType = {}): ReactWrapper => {
    return wrapComponent(HeaderTitle, newParams);
};

const setupHeaderSearchBarComponent = (newParams: NewParamsType = {}): ReactWrapper => {
    return wrapComponent(HeaderSearchBar, newParams);
};

const setupHeaderNavbarComponent = (newParams: NewParamsType = {}): ReactWrapper => {
    return wrapComponent(HeaderNavbar, newParams);
};

describe('Header', () => {
    describe('Header component', () => {
        it('Component renders properly', () => {
            const newParams = {
                wrapperType: MOUNT
            };
            expect(setupHeaderComponent(newParams).length).toEqual(1);
        });

        it('Change burger menu visibility', () => {
            const headerInstance = setupHeaderComponent().dive().dive().instance();
            headerInstance.changeBurgerMenuVisibility()
        });

        it('Change burger menu visibility (for burger menu visible)', () => {
            const newParams = {
                store: {
                    burgerMenuVisible: true
                }
            };
            const headerInstance = setupHeaderComponent(newParams).dive().dive().instance();
            headerInstance.changeBurgerMenuVisibility();
        });

        it('Handle logout', () => {
            const headerInstance = setupHeaderComponent().dive().dive().instance();
            headerInstance.handleLogout(new Event({}));
        });

    });

    describe('Header navbar', () => {
        const headerNavbarProps = {
            changeBurgerMenuVisibility: jest.fn()
        };

        it('Component renders properly', () => {
            expect(setupHeaderNavbarComponent().length).toEqual(1);
        });

        it('Component renders properly (for logged user)', () => {
            const newParams = {
                isLogged: true
            };
            expect(setupHeaderNavbarComponent(newParams).length).toEqual(1);
        });

        it('Change burger menu visibility', () => {
            const newParams = {
                props: headerNavbarProps
            };
            const icon = setupHeaderNavbarComponent(newParams).find('.burgerMenuIcon').at(0);
            icon.simulate('click');
        });
    });

    describe('Header icon', () => {
        it('Component renders properly', () => {
            expect(setupHeaderIconComponent().length).toEqual(1);
        });
    });

    describe('Header title', () => {
        it('Component renders properly', () => {
            expect(setupHeaderTitleComponent().length).toEqual(1);
        });
    });

    describe('Header searchbar', () => {
        it('Component renders properly', () => {
            expect(setupHeaderSearchBarComponent().length).toEqual(1);
        });
    });
});
