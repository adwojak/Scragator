import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { Route } from 'react-router-dom';

export default function LoginRoute(props) {
    const isLogged = useSelector(state => state.isLogged);
    const { path, component, ...options } = props;
    return (
        <Fragment>
            {isLogged && (
                <Route {...options} path={path} component={component}/>
            )}
        </Fragment>
    );
}