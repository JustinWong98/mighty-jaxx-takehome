import { Typography, Button, Box, Grid, Fade, ThemeProvider, CssBaseline } from "@mui/material";
import { Link } from "react-router-dom";

import background from '../../images/MightyJaxxIMG.jpg';
import { kablamFont } from "../../fonts/fonts";

const Homepage: React.FC = () => {
    return (
        <Box 
        sx={{
                backgroundSize: "cover",
                background: `linear-gradient(
                    rgba(0, 0, 0, 0.4), 
                    rgba(0, 0, 0, 0.4)
                  ), url(${background})`,
                backgroundPosition: "center top",
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }} 
            height='100vh'
            width='100vw'
            >
            <Fade in={true} timeout={500}>
                <Grid 
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        backgroundColor: 'rgba(35, 35, 34, 0.8)',
                        borderRadius: '25px',
                    }}
                    height='80%'
                    width='80%'
                    container
                    spacing={3}
                    >
                        <Grid item xs={12}>
                            <ThemeProvider theme={kablamFont} >
                            <CssBaseline />
                                <Typography 
                                    sx={{
                                        color: 'rgba(253,205,0,255)',
                                        margin: '30px 30px',
                                        flexGrow: '2',
                                        fontFamily: 'kaBlam'
                                    }} 
                                    variant="h3"
                                    align="center"
                                    >
                                        MIGHTY JAXX ADMIN DASHBOARD
                                </Typography>
                            </ThemeProvider>
                        </Grid>
                        <Grid item xs={6} sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <Link to='/login' style={{ textDecoration: 'none' }}>
                                <Button variant="contained" size='large'>Login</Button>
                            </Link>
                        </Grid>
                        <Grid item xs={6} sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <Link to='/signup' style={{ textDecoration: 'none' }}>
                                <Button variant="contained" size='large'>Create Admin Account</Button>
                            </Link>
                        </Grid>
                </Grid>
            </Fade>
        </Box>
    );
}

export default Homepage;