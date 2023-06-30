import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axiosInstance from "../../services/Instance/AxiosInstance";
import { Button, Typography } from "@mui/material";
import {motion} from 'framer-motion'

import AddDistrict from "./AddDistrict";
import AdminUpdateDistricts from "./AdminUpdateDistricts";

const AdminDistricts = () => {
  const [users, setUsers] = useState([]);
  // const baseURL = ' http://127.0.0.1:8000/admin_api/getusers/'
  // const userURL = ' http://127.0.0.1:8000/user_api/user/'

  const [districts, setDistricts] = useState([]);

  useEffect(() => {
    // const token = localStorage.getItem('token')
    // const config = { headers: { "Authorization": `Bearer ${token}` } }

    axiosInstance
      .get("/admin_api/getdistricts/")
      .then((res) => {
        res.data.sort((a, b) => {
          return a.id - b.id;
        });
        setDistricts(res.data);
        console.log(res.data);
      })

      .catch((err) => {
        console.log(err);
      });
  }, []);

  
  return (
    <>
    
    <motion.div 
    
    initial={{opacity:0}}
    animate={{opacity:1}}
    transition={{delay:.2, duration:.5}}
     >
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell
                sx={{ fontSize: "1em", color: "#ab003c" }}
                align="center"
              >
                <strong>District Id</strong>
              </TableCell>
              
              <TableCell
                sx={{ fontSize: "1em", color: "#ab003c" }}
                align="center"
              >
                <strong>District Name</strong>
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
            {districts.map((district) => (
              <TableRow
                key={district.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row" align="center">
                  {district.id}
                </TableCell>
                <TableCell align="center">{district.district}</TableCell>
            
                
                
                <TableCell align="center">
                  <AdminUpdateDistricts id={district.id} district={district.district}/>
                </TableCell>{" "}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      </motion.div>
      <AddDistrict />
    </>
  );
};

export default AdminDistricts; 
