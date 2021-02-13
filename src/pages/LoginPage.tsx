import React from 'react';
import { Hidden } from '@material-ui/core';

import srcImg from '../images/svg/login.svg';

import Image from '../shared/components/Image/Image';
import LoginForm from '../components/LoginForm/LoginForm';
import Navigation from '../components/Navigation/Navigation';

export interface LoginPageProps {}

const LoginPage: React.FC<LoginPageProps> = () => {
    return (
        <>
            <Navigation navigationTitle='Logowanie' />
            <Hidden smDown={true}>
                <Image image={{ src: srcImg, alt: '', role: 'presentation' }} />
            </Hidden>
            <LoginForm />
        </>
    );
};

export default LoginPage;
