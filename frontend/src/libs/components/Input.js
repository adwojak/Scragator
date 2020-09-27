import React from 'react';
import './Input.scss';

const Input = ({id, placeholder, type='text'}) => (
    <input type={type} id={id} placeholder={placeholder} className="Input" />
);

export default Input;