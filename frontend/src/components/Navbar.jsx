import { AppBar, Button, Grid, Typography } from "@mui/material";
import React from "react";
import { Link, NavLink } from "react-router-dom";
// import LogoPng from '../assets/Logo.png'
import NavLogDrwr from "./NavLogDrwr";
import NavmenuDrwr from "./NavmenuDrwr";

const Navbar = () => {
  const appbarStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "70px",
  };
  const containStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  };

  const menuStyle = {
    width: { xl: "none", lg: "none", md: "none", sm: "20%", xs: "20%" },
    display: { xl: "none", lg: "nene", md: "none", sm: "flex", xs: "flex" },
  };

  const logoStyle = {
    width: { xl: "20%", lg: "20%", md: "20%", sm: "60%", xs: "650%" },
    display: "flex",
    justifyContent: {
      xl: "start",
      lg: "start",
      md: "start",
      sm: "center",
      xs: "center",
    },
    alignItems: "center",
  };

  const menuitemsStyle = {
    display: { xl: "flex", lg: "flex", md: "flex", sm: "none", xs: "none" },
    justifyContent: "space-evenly",
    alignItems: "center",
  };

  const avtarStyle = {
    width: { xl: "20%", lg: "20%", md: "20%", sm: "20%", xs: "20%" },
    mr: 2,
    display: "flex",
    justifyContent: "end",
    alignItems: "center",
  };

  const typeLogStyle = {
    display: { xl: "flex", lg: "flex", md: "flex", sm: "none", xs: "none" },
    borderRadius: 5,
    textTransform: "none",
  };

  return (
    <>
      <AppBar sx={appbarStyle} position="static">
        <Grid sx={containStyle}>
          <Grid item sx={menuStyle}>
            <NavmenuDrwr />
          </Grid>

          <Grid item sx={logoStyle}>
            <Link reloadDocument style={{ textDecoration: "none" }}>
              {" "}
              <Typography
                sx={{
                  color: "#004d40",
                  boxShadow: 5,
                  fontFamily: `'Myriad Pro Regular'`,
                  fontSize: "1.5rem",
                }}
              >
                <strong>movieBooker</strong>
              </Typography>
            </Link>
          </Grid>
          <Grid item width="50%" sx={menuitemsStyle}>
            <NavLink
              to="/home"
              style={{ textDecoration: "none", color: "white" }}
            >
              <Typography>Home</Typography>
            </NavLink>
            <NavLink
              to="/movies"
              style={{ textDecoration: "none", color: "white" }}
            >
              <Typography>Movies</Typography>
            </NavLink>
            <NavLink
              to="/theaters"
              style={{ textDecoration: "none", color: "white" }}
            >
              <Typography>Theaters</Typography>
            </NavLink>
            <NavLink
              to="/contact"
              style={{ textDecoration: "none", color: "white" }}
            >
              <Typography>Contact</Typography>
            </NavLink>
          </Grid>
          <Grid item sx={avtarStyle}>
            <NavLink to="/login" style={{ textDecoration: "none" }}>
              <Button variant="contained" noWrap sx={typeLogStyle}>
                login/Register
              </Button>
            </NavLink>
            <NavLogDrwr />
          </Grid>
          {/* <NavmenuDrwr/> */}
        </Grid>
      </AppBar>
    </>
  );
};

export default Navbar;
