// @flow
import * as React from 'react';
import { useSelector } from 'react-redux';
import { Route } from 'react-router-dom';

type PropsType = $ReadOnly<{|
    path: string,
    component: React$ComponentType<any>
|}>;

export default function LoginRoute(props: PropsType): React.Node {
    const isLogged = useSelector((state: Object): Object => state.isLogged);
    const { path, component } = props;
    return (
        <React.Fragment>
            {!isLogged && (
                <Route path={ path } component={ component }/>
            )}
        </React.Fragment>
    );
}