import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
// import axios from "axios";
import CheckCircleSharpIcon from "@mui/icons-material/CheckCircleSharp";
import HighlightOffSharpIcon from "@mui/icons-material/HighlightOffSharp";
import { Button, Typography } from "@mui/material";
import AdminUpdateVendor from "./AdminUpdateVendor";
import { motion } from "framer-motion";
import AddButton from "./AddButton";
import axiosInstance from "../../services/Instance/AxiosInstance";

const AdminVendors = () => {
  const [vendors, setVendors] = useState([]);
  const [block, setBlock] = useState([]);

  console.log(vendors);
  //  const baseURL =' http://127.0.0.1:8000/admin_api/getvendors/'\  const token = localStorage.getItem('token')

  useEffect(() => {
    axiosInstance
      .get("/admin_api/getvendors/")
      .then((res) => {
        res.data.vendor.sort((a, b) => {
          console.log(a.id - b.id, "opaisudoiusa");
          return a.id - b.id;
        });

        setVendors(res.data.vendor);
        console.log(res.data.vendor);
        console.log(res.data.district);
      })

      .catch((err) => {
        console.log(err);
      });
  }, [block]);

  const blockVendor = async (id) => {
    try {
      console.log(id, "block");
      await axiosInstance.patch(`/admin_api/blockvendor/${id}/`, id);
    } catch (error) {
      console.log(error);
    }
  };

  const activateVendor = async (id) => {
    try {
      await axiosInstance.patch(`/admin_api/verifyvendor/${id}/`, id);
      console.log(id, "idofvendoractiver");
    } catch (error) {
      console.log(error);
    }
  };

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
              <TableHead sx={{ bgcolor: "black" }}>
                <TableRow>
                  <TableCell align="center" sx={{ color: "#ab003c" }}>
                    <strong>Id</strong>
                  </TableCell>
                  <TableCell align="center" sx={{ color: "#ab003c" }}>
                    <strong>Name</strong>
                  </TableCell>
                  <TableCell align="center" sx={{ color: "#ab003c" }}>
                    <strong>Email</strong>
                  </TableCell>
                  <TableCell align="center" sx={{ color: "#ab003c" }}>
                    <strong>District</strong>
                  </TableCell>
                  <TableCell align="center" sx={{ color: "#ab003c" }}>
                    <strong>City</strong>
                  </TableCell>
                  <TableCell align="center" sx={{ color: "#ab003c" }}>
                    <strong>Status</strong>
                  </TableCell>
                  <TableCell align="center" sx={{ color: "#ab003c" }}>
                    <strong>Update Status</strong>
                  </TableCell>
                  <TableCell align="center" sx={{ color: "#ab003c" }}>
                    <strong></strong>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {vendors.map((vendor) => (
                  <TableRow key={vendor.id}>
                    <TableCell align="center">{vendor.id}</TableCell>
                    <TableCell align="center">{`${vendor.first_name} ${vendor.last_name}`}</TableCell>
                    <TableCell align="center">{vendor.email}</TableCell>
                    <TableCell align="center">{vendor.district}</TableCell>
                    <TableCell align="center">{vendor.city}</TableCell>
                    <TableCell align="center">
                      {vendor.is_active === true ? (
                        <Typography sx={{ fontSize: ".8rem", color: "green" }}>
                          Active now
                        </Typography>
                      ) : (
                        <Typography sx={{ fontSize: ".8rem", color: "red" }}>
                          Blocked
                        </Typography>
                      )}
                    </TableCell>
                    <TableCell align="center">
                      {vendor.is_active=== true ? (
                        <Button
                          variant="contained"
                          sx={{ "&:hover": { bgcolor: "#b71c1c" },fontSize: ".8rem", bgcolor: "red" }}
                          onClick={() => {
                            blockVendor(vendor.id, setBlock(vendor));
                          }}
                        >
                          block here
                        </Button>
                      ) : (
                        <Button
                          variant="contained"
                          sx={{"&:hover": { bgcolor: "#1b5e20" }, fontSize: ".8rem", bgcolor: "green" }}
                          onClick={() => {
                            activateVendor(vendor.id, setBlock(vendor));
                          }}
                        >
                          activate here
                        </Button>
                      )}
                      {/* {
                        <Button
                          sx={{
                            width: "70%",
                            borderRadius: 8,
                            boxShadow: 2,
                            "&:hover": { bgcolor: "#e0e0e0" },
                          }}
                        >
                          {vendor.is_Vendor === true ? (
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
                      } */}
                    </TableCell>
                    <TableCell align="center">
                      {/* <AdminUpdateVendor />  */}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </motion.div>
      {/* <AddButton sx={{}} /> */}
    </>
  );
};

export default AdminVendors;
