import { Grid } from "@mui/material";
import React from "react";
import Image from '../../assets/vndr-LST11.jpg'
import PartnersLogin from "../../components/vendor/PartnersLogin";

const Login = () => {
    const parentStyle = {
        // width:'1000px', height:'780px',
        display: 'flex', justifyContent: 'center',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        width: '100vw',
        height: '760px',
        backgroundImage: `url(${Image})`,
    }
    return (
        <>
            <Grid sx={parentStyle} >
                <PartnersLogin />
            </Grid>
        </>

    );
};

export default Login;
