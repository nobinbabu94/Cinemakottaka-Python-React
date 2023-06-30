import React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import GetScreen from "./GetScreen";
import AddScreen from "./AddScreen";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const PartnersScreen = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab sx={{color:'white'}} label="Screens" {...a11yProps(0)} />
            <Tab sx={{color:'white'}} label="Screen by movie" {...a11yProps(1)} />
            <Tab sx={{color:'white'}} label="City Enquiry" {...a11yProps(1)} />
            {/* <Tab sx={{color:'white'}} label="City Enquiry" {...a11yProps(1)} /> */}
            {/* <Tab label="Item Three" {...a11yProps(2)} /> */}
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
            <GetScreen/>
        </TabPanel>
        <TabPanel value={value} index={1}>
        </TabPanel>
        {/* <TabPanel value={value} index={2}>
        Item Three
      </TabPanel> */}
      <AddScreen/>
      </Box>
    </div>
  );
};

export default PartnersScreen;
