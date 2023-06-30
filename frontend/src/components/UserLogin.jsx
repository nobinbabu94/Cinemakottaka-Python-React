import { Button, Grid, Paper, TextField, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const UserLogin = () => {

    const parentStyle = {
        width: '100%', height: 'auto',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        mt: 2, overflow: "hidden",
    }

    const containerStyle = {
        width: { xl: '30%', lg: '50%', md: '70%', sm: '80%', xs: '90%' }, height: 'auto',
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
                <Paper sx={containerStyle} component="Paper" elevation={6}>
                    <Grid item sx={headerStyle} >
                        <Typography sx={{ fontSize: '2rem', fontWeight: 'bold' }}>Login</Typography>
                        <Typography>Online Movie Ticket Booking</Typography>

                    </Grid>
                    <Grid item sx={inputStyle} component="form">


                        <TextField
                            placeholder="Phone Number"
                        />
                        <TextField
                            placeholder="Password"
                        />
                    </Grid>
                    <Grid item sx={submitStyle}>
                        <Button variant="contained" fullWidth sx={{ textTransform: 'none',borderRadius:5  }}>Submit</Button>
                    </Grid>
                    <Grid>
                        <Typography>Don't you have an account?<Link to='/signup' style={{ textDecoration: 'none', color: '#4a0000', fontWeight: 'bold', }}> Sign up</Link></Typography>
                    </Grid>
                    <Grid sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center',mb:3 }}>
                        <p>or</p>
                        <a href='/partners/register' style={{ textDecoration: 'none', }}><Button  sx={{  width: '100%', textTransform: 'none', color:'#833445'  }}>Log in as a partner</Button></a>
                        {/* <Link to='/admin' style={{ textDecoration: 'none',color:'white', fontWeight:'bold' }}><Button sx={{ textDecoration: 'none',bgcolor:'#212121','&:hover':{bgcolor:'black'}}} variant='contained'>Signup as partner</Button></Link> */}
                    </Grid>
                </Paper>
            </Grid>

        </>
    );
};

export default UserLogin;
