// @flow
import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { Route } from 'react-router-dom';

type Props = $ReadOnly<{|
    path: string,
    component: React$ComponentType<any>
|}>;

export default function LoginRoute(props: Props) {
    const isLogged = useSelector(state => state.isLogged);
    const { path, component } = props;
    return (
        <Fragment>
            {isLogged && (
                <Route path={path} component={component}/>
            )}
        </Fragment>
    );
}