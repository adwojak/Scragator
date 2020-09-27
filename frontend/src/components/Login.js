import React from 'react';
import Input from '../libs/components/Input';
import Button from "../libs/components/Button";
import Text from '../libs/components/Text';
import Form from '../libs/components/Form';
import Logo from '../libs/components/Logo';
import SmallContent from '../libs/components/SmallContent';

const Login = () => (
    <SmallContent>
        <Logo/>
        <Text kind="big">QUOCCA</Text>
        <Text>Login</Text>
        <Form>
            <Input id="email" placeholder="E-mail" />
            <Input id="password" placeholder="Password" />
            <Button>LOGIN</Button>
        </Form>
        <Text>You don't have an account? Register now!</Text>
    </SmallContent>
);

export default Login;