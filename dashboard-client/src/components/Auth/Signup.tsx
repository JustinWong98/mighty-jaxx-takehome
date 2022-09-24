import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Avatar, Button, TextField, FormControlLabel, Checkbox, Link, Grid, Box, Typography, CssBaseline, CircularProgress } from '@mui/material';
import { LockOutlined } from '@mui/icons-material';
import equal from 'fast-deep-equal';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { signupFormData } from '../../app/types';
import { postAdmin, authPending, authFailure, authSuccess } from './authSlice';

const emptyValues: signupFormData = {
    email: '',
    password: '',
    confirmPassword: ''
};

const Signup = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const isLoading = useAppSelector((state) => state.auth.isLoading);
    const serverError = useAppSelector((state) => state.auth.error);
    const [showServerError, setShowServerError] = useState(serverError);
    const [values, setValues] = useState({
        email: '',
        password: '',
        confirmPassword: ''
    });

    const [errors, setErrors] = useState({
        email: '',
        password: '',
        confirmPassword: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        const noErrors = equal(errors, emptyValues);
        if (noErrors && isSubmitting) {
            dispatch(authPending());
            dispatch(postAdmin(values)).then((res) => {
                if (res.type === 'auth/postAdmin/rejected') {
                    dispatch(authFailure(res.payload));
                    setShowServerError(res.payload.data.message);
                } else if (res.type === 'auth/postAdmin/fulfilled') {
                    dispatch(authSuccess(res.payload));
                    navigate('/dashboard');
                }
            });
        } else {
            console.log(noErrors);
            console.log(isSubmitting);
        }
    }, [errors]);

    const handleOnChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setIsSubmitting(false);
        const { name, value } = e.target;
        setValues({ ...values, [name]: value });
    };

    const validateRegistration = ({ password, confirmPassword, email }: signupFormData) => {
        const newErrors = { ...emptyValues };
        if (email.trim() === '') {
            newErrors.email = 'Email must not be empty';
        }
        // Make sure the admin is a valid employee of the company - should have a company email
        else if (email.split('@')[1] !== 'mightyjaxx.com') {
            newErrors.email = 'Email must be a MightyJaxx email';
        }
        if (password === '') {
            newErrors.password = 'Password must not empty';
        } else if (password !== confirmPassword) {
            newErrors.confirmPassword = 'Passwords must match';
        }
        setIsSubmitting(true);
        setErrors(newErrors);
    };
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setErrors({ ...emptyValues });
        validateRegistration(values);
    };
    return (
        <Container maxWidth="xs">
            <CssBaseline />
            {isLoading ? (
                <CircularProgress />
            ) : (
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center'
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlined />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>
                    {serverError && <Typography sx={{ fontWeight: 'bold', color: '#cc0000' }}>{showServerError}</Typography>}
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField required fullWidth id="email" label="Email Address" name="email" autoComplete="email" value={values.email} onChange={handleOnChange} />
                                {errors.email && <Typography sx={{ fontWeight: 'bold', color: '#cc0000' }}>{errors.email}</Typography>}
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                    value={values.password}
                                    onChange={handleOnChange}
                                />
                                {errors.password && <Typography sx={{ fontWeight: 'bold', color: '#cc0000' }}>{errors.password}</Typography>}
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="confirmPassword"
                                    label="Confirm Password"
                                    type="password"
                                    id="confirmPassword"
                                    autoComplete="new-password"
                                    value={values.confirmPassword}
                                    onChange={handleOnChange}
                                />
                                {errors.confirmPassword && <Typography sx={{ fontWeight: 'bold', color: '#cc0000' }}>{errors.confirmPassword}</Typography>}
                            </Grid>
                        </Grid>
                        <Button fullWidth type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
                            Sign Up
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link href="/login" variant="body2">
                                    Already have an account? Sign in
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            )}
        </Container>
    );
};

export default Signup;
