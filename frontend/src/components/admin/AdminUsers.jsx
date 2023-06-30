import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button, Typography } from "@mui/material";
import {motion} from 'framer-motion'
import AddButton from "./AddButton";
import axiosInstance from "../../services/Instance/AxiosInstance";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  // const baseURL = ' http://127.0.0.1:8000/admin_api/getusers/'
  // const userURL = ' http://127.0.0.1:8000/user_api/user/'

  const [block, setBlock] = useState([]);

  useEffect(() => {
    // const token = localStorage.getItem('token')
    // const config = { headers: { "Authorization": `Bearer ${token}` } }
    try {
      axiosInstance.get("/admin_api/getusers/").then((res) => {
        res.data.sort((a, b) => {
          return a.id - b.id;
        });
        setUsers(res.data);
        console.log(res.data);
      });
    } catch (err) {
      console.log(err);
    }
  }, [block]);

  const blockUser = async (id) => {
    try {
      await axiosInstance.patch(`/admin_api/blockuser/${id}/`, id);
    } catch (error) {
      console.log(error);
    }

    // /admin_api/blockvendor/{id}/
  };


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
                <strong>Id</strong>
              </TableCell>
              <TableCell
                sx={{ fontSize: "1em", color: "#ab003c" }}
                align="center"
              >
                <strong>Username</strong>
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
                <strong>Phone Number</strong>
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
            {users.map((user) => (
              <TableRow
                key={user.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row" align="center">
                  {user.id}
                </TableCell>
                <TableCell align="center">{user.username}</TableCell>
                <TableCell align="center">{user.email}</TableCell>
                <TableCell align="center">{user.phone_number}</TableCell>
                <TableCell align="center">
                  <Button
                    onClick={() => {
                      blockUser(user.id, setBlock(user));
                    }}
                    sx={{
                      borderRadius: 8,
                      boxShadow: 2,
                      "&:hover": { bgcolor: "#e0e0e0" },
                    }}
                  >
                    {user.is_active === true ? (
                      <Typography sx={{ fontSize: ".8rem", color: "green" }}>
                        Active
                      </Typography>
                    ) : (
                      <Typography sx={{ fontSize: ".8rem", color: "red" }}>
                        Block
                      </Typography>
                    )}
                  </Button>
                </TableCell>
                {/* <TableCell align="center">
                  <AdUpdtUsers
                    id={user.id}
                    username={user.username}
                    email={user.email}
                    phoneno={user.phone_number}
                    status={user.is_active}
                  />
                </TableCell>{" "} */}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      </motion.div>
      {/* <AddButton /> */}
    </>
  );
};

export default AdminUsers;
