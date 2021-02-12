import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { Formik, Form } from 'formik';
import { Link as RouterLink } from 'react-router-dom';
import { Button, Grid, Link, Typography } from '@material-ui/core';

import { useFetch } from '../../shared/hooks/useFetch';
import { AuthContext } from '../../context/auth-context';

import { registrationApi } from '../../shared/SSOT/paths/apiPaths';
import { loginPath } from '../../shared/SSOT/paths/applicationPaths';
import { fieldsData, initialValues, validationSchema } from './data';

import { TextField } from '../../shared/components/Inputs';
import LoadingSpinner from '../../shared/components/LoadingSpinner/LoadingSpinner';

import useStyles from './RegistrationFormStyles';

export interface RegistationFormProps {}

const { email, password } = fieldsData;

const RegistationForm: React.FC<RegistationFormProps> = () => {
    const classes = useStyles();
    const history = useHistory();

    const { login } = useContext(AuthContext);
    const { sendRequest, clearError, error, isLoading } = useFetch();

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={async (values, actions) => {
                actions.validateForm();
                try {
                    console.log(values);
                    const response = await sendRequest(registrationApi, 'POST', values);
                    login(response.token as any, null, response.userId);
                    history.push('/');
                } catch (error) {
                    actions.setErrors({ [email.name]: true, [password.name]: true });
                    console.log(error);
                }
            }}
        >
            {({ handleBlur }) => (
                <>
                    <Grid item xs={12} md={6} className={classes.RegistrationFormContainer}>
                        <Form className={classes.Form}>
                            <Grid container spacing={2}>
                                <TextField
                                    {...email}
                                    textFieldGrid={{ xs: 12 }}
                                    onBlur={(e) => {
                                        handleBlur(e);
                                        clearError();
                                    }}
                                />
                                <TextField
                                    {...password}
                                    textFieldGrid={{ xs: 12 }}
                                    onBlur={(e) => {
                                        handleBlur(e);
                                        clearError();
                                    }}
                                />
                                {error && (
                                    <Grid item xs={12} className={classes.ErrorContainer}>
                                        <Typography className={classes.Error}>
                                            {error.message}
                                        </Typography>
                                    </Grid>
                                )}
                                <Grid item xs={12} className={classes.FormElementContainer}>
                                    <Link component={RouterLink} to={loginPath}>
                                        Posiadasz już konto ? Zaloguj się!
                                    </Link>
                                </Grid>
                                <Grid item xs={12} className={classes.FormElementContainer}>
                                    <Button
                                        variant='contained'
                                        color='secondary'
                                        type='submit'
                                        fullWidth
                                    >
                                        Zarejestruj się
                                    </Button>
                                </Grid>
                            </Grid>
                        </Form>
                    </Grid>
                    <LoadingSpinner open={isLoading} />
                </>
            )}
        </Formik>
    );
};

export default RegistationForm;