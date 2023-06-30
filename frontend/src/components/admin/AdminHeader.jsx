import React, { useState } from "react";

import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import LanguageIcon from "@mui/icons-material/Language";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import MovieIcon from "@mui/icons-material/Movie";
import PeopleIcon from "@mui/icons-material/People";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import LocationOnIcon from "@mui/icons-material/LocationOn";
// import Logo from "../assets/Movie Booker Logo.jpg";
import { NavLink, Outlet } from "react-router-dom";
import { Button, Grid } from "@mui/material";
import { Stack } from "@mui/system";
import AdminLogout from "./AdminLogout";

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    width: "100%",
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  height: { xl: "15%", lg: "15%", md: "15%", sm: "10%", xs: "10%" },
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

const AdminHeader = () => {
  const theme = useTheme();
  const [open, setOpen] = useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Box
        sx={{ display: "flex", height: "700px",  width: "100%" }}
      >
        <CssBaseline />
        <AppBar
          sx={{ backgroundColor: "#ab003c" }}
          position="fixed"
          open={open}
          
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{ mr: 2, ...(open && { display: "none" }) }}
            >
              <MenuIcon />
            </IconButton>
            <Grid sx={{ width: "80%", disply: "flex" }}>
              <Typography sx={{}}>Admin Control Panel</Typography>
            </Grid>
            <Grid
              sx={{ width: "20%", disply: "flex", justifyContent: "center" }}
            >
              <AdminLogout />
            </Grid>
          </Toolbar>
        </AppBar>
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
            },
          }}
          variant="persistent"
          anchor="left"
          open={open}
        >
          <DrawerHeader>
            <Grid
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                mr: 4,
              }}
            >
              {/* <img width="80%" src={Logo} alt="" /> */}
              <Typography>
                <strong>MovieBooker</strong>
              </Typography>
            </Grid>

            <IconButton width="50%" onClick={handleDrawerClose}>
              {theme.direction === "ltr" ? (
                <ChevronLeftIcon />
              ) : (
                <ChevronRightIcon />
              )}
            </IconButton>
          </DrawerHeader>

          <List>
          <NavLink
              to=""
              style={(isActive) => ({
                color: isActive ? "black" : "black",
                textDecoration: isActive ? "none" : "none",
              })}
            >
              <Divider />
              <ListItem disablePadding sx={{ mt: 5, boxShadow: 2 }}>
                <ListItemButton>
                  <ListItemIcon>
                    <LanguageIcon />
                  </ListItemIcon>
                  <ListItemText primary={"Home"}></ListItemText>
                </ListItemButton>
              </ListItem>
            </NavLink>
            <NavLink
              to="add/languages"
              style={(isActive) => ({
                color: isActive ? "black" : "black",
                textDecoration: isActive ? "none" : "none",
              })}
            >
              <Divider />
              <ListItem disablePadding sx={{ mt: 2, boxShadow: 2 }}>
                <ListItemButton>
                  <ListItemIcon>
                    <LanguageIcon />
                  </ListItemIcon>
                  <ListItemText primary={"Movie Language"}></ListItemText>
                </ListItemButton>
              </ListItem>
            </NavLink>
            <NavLink
              to="add/cities"
              style={(isActive) => ({
                color: isActive ? "black" : "red",
                textDecoration: isActive ? "none" : "none",
              })}
            >
              <ListItem disablePadding sx={{ mt: 2, boxShadow: 2 }}>
                <ListItemButton>
                  <ListItemIcon>
                    <LocationCityIcon />
                  </ListItemIcon>
                  <ListItemText primary={"Cities"}></ListItemText>
                </ListItemButton>
              </ListItem>
            </NavLink>
            <NavLink
              to="add/districts"
              style={(isActive) => ({
                color: isActive ? "black" : "black",
                textDecoration: isActive ? "none" : "none",
              })}
            >
              <ListItem disablePadding sx={{ mt: 2, boxShadow: 2 }}>
                <ListItemButton>
                  <ListItemIcon>
                    <LocationOnIcon />
                  </ListItemIcon>
                  <ListItemText primary={"Dictricts"}></ListItemText>
                </ListItemButton>
              </ListItem>
            </NavLink>
            <NavLink
              to="add/movies"
              style={(isActive) => ({
                color: isActive ? "black" : "black",
                textDecoration: isActive ? "none" : "none",
              })}
            >
              <ListItem disablePadding sx={{ mt: 2, boxShadow: 2 }}>
                <ListItemButton>
                  <ListItemIcon>
                    <MovieIcon />
                  </ListItemIcon>
                  <ListItemText primary={"Movie"}></ListItemText>
                </ListItemButton>
              </ListItem>
            </NavLink>
            <NavLink
              to="add/users"
              style={(isActive) => ({
                color: isActive ? "black" : "black",
                textDecoration: isActive ? "none" : "none",
              })}
            >
              <ListItem disablePadding sx={{ mt: 2, boxShadow: 2 }}>
                <ListItemButton>
                  <ListItemIcon>
                    <PeopleIcon />
                  </ListItemIcon>
                  <ListItemText primary={"Users"}></ListItemText>
                </ListItemButton>
              </ListItem>
            </NavLink>
            <NavLink
              to="add/vendors"
              style={(isActive) => ({
                color: isActive ? "black" : "black",
                textDecoration: isActive ? "none" : "none",
              })}
            >
              <ListItem disablePadding sx={{ mt: 2, boxShadow: 2 }}>
                <ListItemButton>
                  <ListItemIcon>
                    <BusinessCenterIcon />
                  </ListItemIcon>
                  <ListItemText primary={"Vendors"}></ListItemText>
                </ListItemButton>
              </ListItem>
            </NavLink>
          </List>
        </Drawer>
        <Main open={open}>
          <DrawerHeader />
          <Outlet />
        </Main>
      </Box>
    </>
  );
};

export default AdminHeader;
