import * as React from "react";
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
import Collapse from "@mui/material/Collapse";
import { Link, Outlet } from "react-router-dom";
import { Button, Grid } from "@mui/material";
import Logout from "./Logout";
import { useState } from "react";
import ExpandMore from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import StarBorder from "@mui/icons-material/StarBorder";

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    // color:'red',
    backgroundColor: "#bdbdbd",
    height: "100vh",
    //outlet style
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
  // backgroundColor:'#00897b',
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
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export default function Header() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [expandmenu, setExpandmenu] = useState(false);

  const handleClick = () => {
    setExpandmenu(!expandmenu);
  };
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
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
            <Typography sx={{}}>Office portal by MovieBooker</Typography>
          </Grid>
          <Grid sx={{ width: "20%", disply: "flex", justifyContent: "center" }}>
            <Logout />
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
            backgroundColor: "#263238",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon sx={{ color: "white" }} />
            ) : (
              <ChevronRightIcon sx={{ color: "white" }} />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List sx={{ mt: 5 }}>
          <ListItem
            onClick={handleClick}
            sx={{
              mt: 2,
              boxShadow: 2,
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Link
              to="/partners/home"
              style={{ textDecoration: "none", color: "white" }}
            >
              Home{" "}
            </Link>
            {expandmenu ? <ExpandLessIcon sx={{color:'white'}}/> : <ExpandMore sx={{color:'white'}}/>}
          </ListItem>
          {/* <Collapse in={expandmenu} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <ListItemText primary="Starred" />
          </ListItemButton>
        </List>
      </Collapse> */}

          <Link to="screen" style={{ textDecoration: "none", color: "white" }}>
            <ListItem sx={{ mt: 2, boxShadow: 2 }}>Screen</ListItem>
          </Link>
          <Link to="seats" style={{ textDecoration: "none", color: "white" }}>
            <ListItem sx={{ mt: 2, boxShadow: 2 }}>Seats</ListItem>
          </Link>
          <Link to="show" style={{ textDecoration: "none", color: "white" }}>
            <ListItem sx={{ mt: 2, boxShadow: 2 }}>Show</ListItem>
          </Link>
          <Link to="seats" style={{ textDecoration: "none", color: "white" }}>
            <ListItem sx={{ mt: 2, boxShadow: 2 }}>Seats</ListItem>
          </Link>
        </List>
        <Divider />
        <List></List>
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        <Typography paragraph>
          <Outlet />
        </Typography>
      </Main>
    </Box>
  );
}
