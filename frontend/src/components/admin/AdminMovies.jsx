import React, { useEffect, useState } from "react";
import {
  Button,
  Grid,
  List,
  ListItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import axiosInstance from "../../services/Instance/AxiosInstance";
import { deepOrange } from "@mui/material/colors";
import AddMovie from "./AddMovie";
import AdminUpdateMovie from "./AdminUpdateMovie";
import { motion } from "framer-motion";
import AdminDeleteMovie from "./AdminDeleteMovie";

const AdminMovies = () => {
  const [movies, setMovies] = useState([]);
  const [block, setBlock] = useState([]);
  let i = ['1','2','3'];

  console.log(i[1]);

  useEffect(() => {
    try {
      axiosInstance.get("admin_api/moviedetails/").then((res) => {
        res.data.sort((a, b) => {
          // console.log(a.id - b.id,'opaisudoiusa')
          return a.id - b.id;
        });
        console.log(res.data);
        setMovies(res.data);
       
      });
    } catch (err) {
      console.log(err);
    }
  }, [block]);
  console.log(movies,'movies data');

  const deleteMovie = async (id) => {
    try {
      console.log(id,'delete data in movie data');
      // await axiosInstance.delete(`/admin_api/updatemovie/${id}/`, id);
    } catch (error) {
      console.log(error);
    }


  };

  const blockMovie = async (id) => {
    
    try {
      await axiosInstance.patch(`admin_api/blockmovie/${id}/`, id);
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
                    <strong>TMDB id</strong>
                  </TableCell>
                  <TableCell
                    sx={{ fontSize: "1em", color: "#ab003c" }}
                    align="center"
                  >
                    <strong>Movie Name</strong>
                  </TableCell>
                  <TableCell
                    sx={{ fontSize: "1em", color: "#ab003c" }}
                    align="center"
                  >
                    <strong>Category</strong>
                  </TableCell>
                  <TableCell
                    sx={{ fontSize: "1em", color: "#ab003c" }}
                    align="center"
                  >
                    <strong>Status</strong>
                  </TableCell>
                  <TableCell
                    sx={{ fontSize: "1em", color: "#ab003c" }}
                    align="center"
                  >
                    <strong>Edit</strong>
                  </TableCell>
                  <TableCell
                    sx={{ fontSize: "1em", color: "#ab003c" }}
                    align="center"
                  >
                    <strong>Delete</strong>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {movies.map((movie) => (
                  <TableRow key={movie.id}>
                    <TableCell align="center">{movie.id}</TableCell>
                    <TableCell align="center">{movie.tmdb_id}</TableCell>
                    <TableCell align="center">{movie.movie_name}</TableCell>
                    <TableCell align="center">{movie.category_name}</TableCell>

                    <TableCell
                      onClick={() => {
                        blockMovie(movie.id, setBlock(movie));
                      }}
                      align="center"
                    >
                      {
                        <Button
                          sx={{
                            width: "70%",
                            borderRadius: 8,
                            boxShadow: 2,
                            "&:hover": { bgcolor: "#e0e0e0" },
                          }}
                        >
                          {movie.is_active === true ? (
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
                    <TableCell align="center">
                      <AdminUpdateMovie
                        Id={movie.id}
                        tmdb={movie.tmdb_id}
                        nameMovie={movie.movie_name}
                        category={movie.category_name}
                        status={movie.is_active}
                      />
                    </TableCell>
                    <TableCell align="center">
                      <AdminDeleteMovie id={movie.id} movie={movie.movie_name} />
                      {/* <Button
                      onClick={() => {
                        deleteMovie(movie.id, setBlock(movie));
                      }}
                        sx={{color:'red', }}
                      >
                        <DeleteIcon  sx={{ "&:hover": { color:'red' } }}/>
                      </Button> */}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </motion.div>

      <AddMovie />
    </>
  );
};

export default AdminMovies;
