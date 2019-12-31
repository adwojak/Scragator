import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import configureMockStore from 'redux-mock-store';
import Login from '../../components/Login';

Enzyme.configure({ adapter: new Adapter() })

const setupComponent = () => {
    const mockStore = configureMockStore();
    const store = mockStore({});
    return shallow(<Login store={store} />).shallow()
};

describe('Login Component', () => {
    it('Has form', () => {
        const node = setupComponent().find('form');
        expect(node.length).toEqual(1);
    });

    describe('Login label', () => {
        const node = setupComponent().find('label');

        it('Has label', () => {
            expect(node.length).toEqual(1);
        });

        it('Has property htmlFor', () => {
            const htmlFor = node.props().htmlFor;
            expect(htmlFor).toEqual('login');
        });

        it('Has proper text', () => {
            const text = node.text();
            expect(text).toEqual('Login');
        })
    });

    describe('Login button', () => {
        const node = setupComponent().find('button');

        it('Has button', () => {
            expect(node.length).toEqual(1);
        });

        it('Has property type=submit', () => {
            const type = node.props().type;
            expect(type).toEqual('submit');
        });

        it('Has proper text', () => {
            const text = node.text();
            expect(text).toEqual('Save');
        });
    });

    describe('Login inputs', () => {
        const node = setupComponent().find('input');

        it('Has two inputs', () => {
            expect(node.length).toEqual(2);
        });

        describe('User login input', () => {
            const loginNode = node.find('#login');

            it('Has user login input', () => {
                expect(loginNode.length).toEqual(1);
            });

            it('Has property type=text', () => {
                const type = loginNode.props().type;
                expect(type).toEqual('text');
            });
        });

        describe('User password input', () => {
            const passwordNode = node.find('#password');

            it('Has user password input', () => {
                expect(passwordNode.length).toEqual(1);
            });

            it('Has property type=password', () => {
                const type = passwordNode.props().type;
                expect(type).toEqual('password');
            });
        });
    });
});