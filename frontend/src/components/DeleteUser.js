import React from 'react';
import Button from "../libs/components/Button";
import Text from '../libs/components/Text';
import Logo from '../libs/components/Logo';
import SmallContent from '../libs/components/SmallContent';

const DeleteUser = () => (
    <SmallContent>
        <Logo/>
        <Text kind="big">QUOCCA</Text>
        <Text>Are you sure you want to delete profile?</Text>
        <Button>Delete profile</Button>
    </SmallContent>
);

export default DeleteUser;