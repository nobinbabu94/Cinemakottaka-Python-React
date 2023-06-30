import { Grid } from "@mui/material";
import React from "react";
// import bgImg from '../../assets/bg2.webp'
import AdminLogin from "../../components/admin/AdminLogin";



const Login = () => {




    const ParentStyle = {
        width: '100%',
        height: '760px',
        display: 'flex', justifyContent: 'center', 
        // backgroundImage: `url(${bgImg})`,
        backgroundColor:'black'
    }


    return (
        <>
            <Grid sx={ParentStyle}>
                <AdminLogin />
            </Grid>
        </>
    );
};
export default Login;