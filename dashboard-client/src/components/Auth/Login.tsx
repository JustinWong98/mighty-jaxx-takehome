import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Avatar, Button, TextField, Link, Grid, Box, Typography, CssBaseline, CircularProgress } from '@mui/material';
import { LockOutlined } from '@mui/icons-material';
import equal from 'fast-deep-equal';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { loginFormData } from '../../app/types';
import { authPending, loginAdmin, authFailure, authSuccess } from './authSlice';

const emptyValues: loginFormData = {
    email: '',
    password: ''
};

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const isLoading = useAppSelector((state) => state.auth.isLoading);
    const serverError = useAppSelector((state) => state.auth.error);
    const [showServerError, setShowServerError] = useState(serverError);
    const [values, setValues] = useState({
        email: '',
        password: ''
    });

    const [errors, setErrors] = useState({
        email: '',
        password: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        const noErrors = equal(errors, emptyValues);
        if (noErrors && isSubmitting) {
            dispatch(authPending());
            dispatch(loginAdmin(values)).then((res) => {
                if (res.type === 'auth/login/rejected') {
                    dispatch(authFailure(res.payload));
                    setShowServerError(res.payload.data.message);
                } else if (res.type === 'auth/login/fulfilled') {
                    dispatch(authSuccess(res.payload));
                    navigate('/dashboard');
                }
            });
        } else {
            console.log('errorsss');
        }
    }, [errors]);

    const handleOnChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setIsSubmitting(false);
        const { name, value } = e.target;
        setValues({ ...values, [name]: value });
    };

    const validateRegistration = ({ password, email }: loginFormData) => {
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
        <Container component="main" maxWidth="xs">
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
                        Sign in
                    </Typography>
                    {serverError && <Typography sx={{ fontWeight: 'bold', color: '#cc0000' }}>{showServerError}</Typography>}
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField margin="normal" required fullWidth id="email" label="Email Address" name="email" autoComplete="email" autoFocus onChange={handleOnChange} />
                                {errors.email && <Typography sx={{ fontWeight: 'bold', color: '#cc0000' }}>{errors.email}</Typography>}
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="current-password"
                                    onChange={handleOnChange}
                                />
                                {errors.password && <Typography sx={{ fontWeight: 'bold', color: '#cc0000' }}>{errors.password}</Typography>}
                            </Grid>
                        </Grid>
                        {/* <FormControlLabel control={<Checkbox value="remember" color="primary" />} label="Remember me" /> */}
                        <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                            Sign In
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link href="/signup" variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            )}
        </Container>
    );
};

export default Login;
