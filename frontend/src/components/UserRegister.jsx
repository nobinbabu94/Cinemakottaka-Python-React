import { Button, Grid, Paper, TextField, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { colors } from "../styles/theme";

const UserRegister = () => {

    const parentStyle = {
        width: '100%', height: 'auto',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        mt: 2, overflow: "hidden",
    }

    const containerStyle = {
        width: { xl: '30%', lg: '60%', md: '70%', sm: '80%', xs: '100%' }, height: 'auto',
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        gap: 3, mt: 2,mb:5
    }

    const headerStyle = {
        width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center',
        pt: 2
    }

    const inputStyle = {
        width: '70%', display: 'flex', flexDirection: 'column', gap: 2, pt: 5
    }
    const submitStyle = {
        width: '60%'
    }
    return (
        <>
            <Grid sx={parentStyle}>
                <Paper sx={containerStyle} elevation={6} >
                    <Grid item sx={headerStyle} >
                        <Typography sx={{ fontSize: '2rem', fontWeight: 'bold' }}>Register</Typography>
                        <Typography>Online Movie Ticket Booking</Typography>

                    </Grid>
                    <Grid item sx={inputStyle} component="form">

                    <TextField
                            placeholder="Username"
                        />
                        <TextField
                            placeholder="Email"
                        />
                        <TextField
                            placeholder="Phone Number"
                        />
                        <TextField
                            placeholder="Password"
                        />
                    </Grid>
                    <Grid item sx={submitStyle}>
                        <Button variant="contained" fullWidth sx={{ textTransform: 'none',borderRadius:5 , }}>Submit</Button>
                    </Grid>
                    <Grid>
                        <Typography>Already have an account?<Link to='/login' style={{ textDecoration: 'none', fontWeight: 'bold',color:colors.reddish}}>Login</Link></Typography>
                    </Grid>
                    <Grid sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center',mb:5 }}>
                        <p>or</p>
                        {/* <a href='/partners' style={{ textDecoration: 'none', }} ><Button sx={{ width: '100%',textTransform: 'none',color:'#833445', '&:hover': { bgcolor: 'black',color:'white' } }}>Sign up as a partner</Button></a> */}
                        <Link to='/partners' style={{ textDecoration: 'none',color:'white', fontWeight:'bold' }}><Button sx={{ textDecoration: 'none',bgcolor:'#212121','&:hover':{bgcolor:'black'}}} variant='contained'>Signup as partner</Button></Link>
                    </Grid>
                </Paper>
            </Grid>

        </>
    );
};

export default UserRegister;
