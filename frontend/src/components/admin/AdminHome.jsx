import {
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import axiosInstance from "../../services/Instance/AxiosInstance";
import Paper from "@mui/material/Paper";

const AdminHome = () => {
  const [playingmovies, setPlayingmovies] = useState([]);
  useEffect(() => {
    axiosInstance.get("admin_api/tmdbnowplayingmovies/").then((res) => {
      setPlayingmovies(res.data);
      console.log(res.data);
    });
  }, []);

  const styleHead = {
    display: "flex",
    width: "100%",
    bgcolor: "green",
    height: "650px",
  };
  const movieStyleHead = {
    display: "flex",
    width: "250px",
    height: "300px",
    bgcolor: "red",
  };
  return (
    <>
      <motion.div
        initial={{ y: "100vw" }}
        animate={{ y: 0 }}
        transition={{ delay: 0.2, type: "spring" }}
      >
        <Grid>
          <TableContainer component={Paper}>
            <h1>Hello</h1>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
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
                      <strong>Movie Language</strong>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row" align="center">
                    String : {playingmovies.string}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </TableContainer>
        </Grid>
      </motion.div>
    </>
  );
};

export default AdminHome;
