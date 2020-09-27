import React from 'react';
import './Text.scss';
import classNames from 'classnames';

const Text = ({children, kind='default'}) => (
    <p className={classNames(
        {
            big: 'TextBig',
            default: 'TextDefault'
        }[kind] || 'TextDefault'
    )}>{children}</p>
);

export default Text;