import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axiosInstance from "../../services/Instance/AxiosInstance";
import { motion } from "framer-motion";
import AddCity from "./AddCity";
import AdminUpdateCity from "./AdminUpdateCity";

const AdminCity = () => {
  const [cities, setCities] = useState([]);

  useEffect(() => {
    try {
      axiosInstance.get("/admin_api/getcities/").then((res) => {
        res.data.sort((a, b) => {
          return a.id - b.id;
        });
        setCities(res.data);
        console.log(res.data);
      });
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <TableContainer
          component={Paper}
          sx={{
            width: "100%",
            height: "70%",
            overflow: "hidden",
            borderRadius: " 25px 25px 0 0",
          }}
        >
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
                  <strong>City</strong>
                </TableCell>
                <TableCell
                  sx={{ fontSize: "1em", color: "#ab003c" }}
                  align="center"
                >
                  <strong>District</strong>
                </TableCell>

                
                <TableCell
                  sx={{ fontSize: "1em", color: "#ab003c" }}
                  align="center"
                >
                  <strong>Edit</strong>
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {cities.map((city) => (
                <TableRow
                  key={city.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row" align="center">
                    {city.id}
                  </TableCell>
                  <TableCell align="center">{city.city}</TableCell>
                  <TableCell align="center">{city.district}</TableCell>
                

                  <TableCell align="center">
                    <AdminUpdateCity
                      Id={city.id}
                      city={city.city}
                      district={city.district}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </motion.div>
      <AddCity />
    </>
  );
};

export default AdminCity;
