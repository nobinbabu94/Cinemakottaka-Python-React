import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import {motion} from 'framer-motion'
import axiosInstance from "../../services/Instance/AxiosInstance";

const GetScreen = () => {
    const [screens, setScreens] = useState([]);
    const [block, setBlock] = useState([]);

    useEffect(() => {
        try {
          axiosInstance.get("/vendor_api/getallscreen/").then((res) => {
            res.data.sort((a, b) => {
              // console.log(a.id - b.id,'opaisudoiusa')
              return a.id - b.id;
            });
            console.log(res.data);
            setScreens(res.data);
           
          });
        } catch (err) {
          console.log(err);
        }
      }, [block]);

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <Paper
          elevation={5}
          sx={{
            width: "100%",
            height: "70%",
            overflow: "hidden",
            borderRadius: " 25px 25px 0 0",
          }}
        >
          <TableContainer sx={{ maxHeight: 575 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell
                    sx={{ fontSize: "1em", color: "#ab003c" }}
                    align="center"
                  >
                    <strong>Id</strong>
                  </TableCell>
                  <TableCell
                    sx={{ fontSize: "1em", color: "#ab003c" }}
                    align="center"
                  >
                    <strong>Screen Name</strong>
                  </TableCell>
                  <TableCell
                    sx={{ fontSize: "1em", color: "#ab003c" }}
                    align="center"
                  >
                    <strong>Total Seat</strong>
                  </TableCell>
                  <TableCell
                    sx={{ fontSize: "1em", color: "#ab003c" }}
                    align="center"
                  >
                    <strong>Price</strong>
                  </TableCell>
                  <TableCell
                    sx={{ fontSize: "1em", color: "#ab003c" }}
                    align="center"
                  >
                    <strong>Vendor</strong>
                  </TableCell>
                  
                </TableRow>
              </TableHead>
              <TableBody>
                {screens.map((screen) => (
                  <TableRow key={screen.id}>
                    <TableCell align="center">{screen.id}</TableCell>
                    <TableCell align="center">{screen.screen_name}</TableCell>
                    <TableCell align="center">{screen.total_seet}</TableCell>
                    <TableCell align="center">{screen.price}</TableCell>
                    <TableCell align="center">{screen.vendor}</TableCell>
                    <TableCell align="center"></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </motion.div>
    </>
  );
};

export default GetScreen;
