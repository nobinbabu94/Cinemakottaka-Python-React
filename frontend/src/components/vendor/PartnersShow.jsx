import {
  Button,
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
import { motion } from "framer-motion";
import axiosInstance from "../../services/Instance/AxiosInstance";
import AddButton from "./AddButton";
import AddShow from "./AddShow";

const PartnersShow = () => {
  const [shows, setShows] = useState([]);
  const [block, setBlock] = useState([]);

  useEffect(() => {
    try {
      axiosInstance.get("/vendor_api/getallshow/").then((res) => {
        res.data.sort((a, b) => {
          // console.log(a.id - b.id,'opaisudoiusa')
          return a.id - b.id;
        });
        console.log(res.data, "get all show res");
        setShows(res.data);
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
                    <strong>Movie</strong>
                  </TableCell>
                  <TableCell
                    sx={{ fontSize: "1em", color: "#ab003c" }}
                    align="center"
                  >
                    <strong>Language</strong>
                  </TableCell>
                  <TableCell
                    sx={{ fontSize: "1em", color: "#ab003c" }}
                    align="center"
                  >
                    <strong>Date</strong>
                  </TableCell>
                  <TableCell
                    sx={{ fontSize: "1em", color: "#ab003c" }}
                    align="center"
                  >
                    <strong>Time</strong>
                  </TableCell>
                  <TableCell
                    sx={{ fontSize: "1em", color: "#ab003c" }}
                    align="center"
                  >
                    <strong>Screen</strong>
                  </TableCell>
                  <TableCell
                    sx={{ fontSize: "1em", color: "#ab003c" }}
                    align="center"
                  >
                    <strong>Status</strong>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {shows.map((show) => (
                  <TableRow key={show.id}>
                    <TableCell align="center">{show.id}</TableCell>
                    <TableCell align="center">{show.movie}</TableCell>
                    <TableCell align="center">{show.category_name}</TableCell>
                    <TableCell align="center">{show.date}</TableCell>
                    <TableCell align="center">{show.time}</TableCell>
                    <TableCell align="center">{show.screen}</TableCell>
                    <TableCell align="center">
                    {
                        <Button
                          sx={{
                            width: "70%",
                            borderRadius: 8,
                            boxShadow: 2,
                            "&:hover": { bgcolor: "#e0e0e0" },
                          }}
                        >
                          {show.is_active === true ? (
                            <Typography
                              sx={{ fontSize: ".8rem", color: "green" }}
                            >
                              Active
                            </Typography>
                          ) : (
                            <Typography
                              sx={{ fontSize: ".8rem", color: "red" }}
                            >
                              Block
                            </Typography>
                          )}
                        </Button>
                      }
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
                      <AddShow/>
        </Paper>
     
      </motion.div>
    </>
  );
};

export default PartnersShow;
