import { AppBar, Box, Typography, Toolbar, Button, Container, CssBaseline } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { useAuth } from '../Auth/AuthContext';

function Navbar() {
    const navigate = useNavigate();
    const auth = useAuth();
    const dispatch = useAppDispatch();
    const userInfo = useAppSelector((state) => state.auth.data);
    useEffect(() => {
        console.log(userInfo);
    }, [userInfo]);
    const handleSignOut = () => {
        auth.handleLogout();
        navigate('/');
    };
    // appbar with mightyjaxx on left side, email and signout option flushed to right
    return (
        <AppBar position="static">
            <CssBaseline />
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Typography variant="h6" noWrap component="div" sx={{ display: { xs: 'none', sm: 'block' } }}>
                        Mighty Jaxx Admin Board
                    </Typography>
                    {userInfo!.email && <Typography>{userInfo!.email}</Typography>}
                    <Button onClick={handleSignOut}>Sign Out</Button>
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default Navbar;
