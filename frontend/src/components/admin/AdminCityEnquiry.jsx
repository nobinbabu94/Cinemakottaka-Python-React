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
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import axiosInstance from "../../services/Instance/AxiosInstance";

const AdminCityEnquiry = () => {
  const [cityenquiry, setCityenquiry] = useState([]);
  const [block, setBlock] = useState([]);

  useEffect(() => {
    // const token = localStorage.getItem('token')
    // const config = { headers: { "Authorization": `Bearer ${token}` } }
    try {
      axiosInstance.get("/admin_api/getcityenquery/").then((res) => {
        res.data.sort((a, b) => {
          return a.id - b.id;
        });
        setCityenquiry(res.data);
        console.log(res.data, "ciyyenquireyel;k;flgj");
      });
    } catch (err) {
      console.log(err);
    }
  }, [block]);

  const filtered = cityenquiry.filter(enquiries => {
    return enquiries.is_approved === false; 
  });

  console.log(filtered,'filtered')
  const approveCity = async (id) => {
    try {
      await axiosInstance.patch(`/admin_api/approvecityenquery/${id}/`, id);
    } catch (error) {
      console.log(error);
    }

    // /admin_api/blockvendor/{id}/
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
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
                  <strong>City</strong>
                </TableCell>
                <TableCell
                  sx={{ fontSize: "1em", color: "#ab003c" }}
                  align="center"
                >
                  <strong>Email</strong>
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
                  <strong>Status</strong>
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {filtered.map((enquiry) => (
                <TableRow
                  key={enquiry.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row" align="center">
                    {enquiry.id}
                  </TableCell>
                  <TableCell align="center">
                    {enquiry.cityenqueryname}
                  </TableCell>
                  <TableCell align="center">{enquiry.email}</TableCell>
                  <TableCell align="center">{enquiry.district}</TableCell>
                  <TableCell align="center">
                    {
                      <Button
                        onClick={() => {
                          approveCity(enquiry.id, setBlock(enquiry));
                        }}
                        sx={{
                          borderRadius: 8,
                          boxShadow: 2,
                          "&:hover": { bgcolor: "#e0e0e0" },
                        }}
                      >
                        {enquiry.is_approved === true ? (
                          <Typography
                            sx={{ fontSize: ".8rem", color: "green" }}
                          >
                            Approve enquiry
                          </Typography>
                        ) : (
                          <Typography sx={{ fontSize: ".8rem", color: "red" }}>
                            Block
                          </Typography>
                        )}
                      </Button>
                    }
                  </TableCell>
                  

                  {/* <TableCell align="center">
                  <AdminUpdateCity Id={city.id} city={city.city} district={city.district}/>
                </TableCell> */}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </motion.div>
    </>
  );
};

export default AdminCityEnquiry;
