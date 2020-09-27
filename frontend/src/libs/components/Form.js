import React from 'react';
import './Form.scss';

const Form = ({children}) => (
    <form className="Form">
        {children}
    </form>
);

export default Form;