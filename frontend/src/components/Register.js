import React from 'react';
import Input from '../libs/components/Input';
import Button from "../libs/components/Button";
import Text from '../libs/components/Text';
import Form from '../libs/components/Form';
import Logo from '../libs/components/Logo';
import SmallContent from '../libs/components/SmallContent';

const Register = () => (
    <SmallContent>
        <Logo/>
        <Text kind="big">QUOCCA</Text>
        <Text>Create account</Text>
        <Form>
            <Input id="email" placeholder="E-mail" />
            <Input id="password" placeholder="Password" />
            <Input id="repeatPassword" placeholder="Repeat password" />
            <Button>REGISTER</Button>
        </Form>
        <Text>Already have an account? Log in!</Text>
    </SmallContent>
);

export default Register;