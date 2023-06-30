
import { Grid } from "@mui/material";
import React from "react";
import Image from '../../assets/vndr-001-ST.jpg'
import VendorRegister from "../../components/vendor/PartnersRegister";

const register = () => {

    const parentStyle = {
        // width:'1000px', height:'780px',
        display: 'flex', justifyContent: 'center',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        width: '100vw',
        height:'760px',
        backgroundImage: `url(${Image})`,   

    }
    return (
        <>

            <Grid sx={parentStyle} >
                <VendorRegister />
            </Grid>
        </>
    );
};

export default register;
