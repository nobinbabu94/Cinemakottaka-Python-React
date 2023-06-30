import React, { useEffect, useState } from "react";
import Backdrop from "@mui/material/Backdrop";
// import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Grid, Paper, TextField } from "@mui/material";

import { useForm,  } from "react-hook-form";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import axiosInstance from "../../services/Instance/AxiosInstance";
import { motion } from "framer-motion";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const btnStyle = {
  position: "fixed",
  top: "92%",
  left: "93%",
  transform: "translate(-50%, -50%)",
  pt: 2,
  px: 4,
  pb: 3,
};

const AddScreen = ({ city, district }) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const textStyle = {
    display: "flex",
    width: "auto",
    m: 1,
  };

  const paperStyle = {
    padding: 5,
    height: "auto",
    mb: 3,
  };

  const onSubmit = async (data) => {
    try {
      await axiosInstance.post("/vendor_api/addscreen/", {
        screen_name: data.screenName, total_seet:data.seatnumbers,price:data.priceofseat
      });
      handleClose();
    } catch (e) {
      alert(e);
    }
  };




  return (
    <div>
      <Box sx={btnStyle}>
        <Fab
          sx={{
            bgcolor: "#ab003c",
            color: "white",
            "&:hover": { bgcolor: "#f50057" },
            borderRadius: 8,
            boxShadow: 5,
          }}
          aria-label="add"
          onClick={handleOpen}
        >
          <AddIcon />
        </Fab>
      </Box>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        // onClose={handleClose}
        closeAfterTransition
      >
        <Fade in={open}>
          <Box sx={style}>
            <Paper
              elevation={5}
              component="form"
              sx={paperStyle}
              onSubmit={handleSubmit(onSubmit)}
            >
              <Grid>
                <Grid sx={{ display: "flex", justifyContent: "center" }}>
                  <Typography variant="h5">Add Screen</Typography>
                </Grid>

                
                <Grid sx={{ mt: 3 }}>
                  <TextField
                    variant="standard"
                    label="Screen Name"
                    placeholder="Screen Name"
                    style={textStyle}
                    type="text"
                    {...register("screenName", { required: true })}
                  />
                  {errors.screenName && errors.screenName.type === "required" && (
                    <p
                      style={{
                        padding: 0,
                        margin: 0,
                        color: "#d50000",
                      }}
                    >
                      Screen Name is required.
                    </p>
                  )}
                </Grid>
                <Grid sx={{ mt: 3 }}>
                  <TextField
                    variant="standard"
                    label="Total Seat"
                    placeholder="Total Seat"
                    style={textStyle}
                    type="tel"
                    {...register("seatnumbers", { required: true })}
                  />
                  {errors.seatnumbers && errors.seatnumbers.type === "required" && (
                    <p
                      style={{
                        padding: 0,
                        margin: 0,
                        color: "#d50000",
                      }}
                    >
                      Seat Number is required.
                    </p>
                  )}
                </Grid>
                <Grid sx={{ mt: 3 }}>
                  <TextField
                    variant="standard"
                    label="Price"
                    placeholder="Price"
                    style={textStyle}
                    type="tel"
                    {...register("priceofseat", { required: true })}
                  />
                  {errors.priceofseat && errors.priceofseat.type === "required" && (
                    <p
                      style={{
                        padding: 0,
                        margin: 0,
                        color: "#d50000",
                      }}
                    >
                      City Name is required.
                    </p>
                  )}
                </Grid>

                <Grid
                  sx={{
                    mt: 5,
                    display: "flex",
                    justifyContent: "center",
                    gap: 5,
                  }}
                >
                  <Button
                    onClick={handleClose}
                    variant="contained"
                    sx={{
                      bgcolor: "#616161",
                      "&:hover": { bgcolor: "#616161" },
                    }}
                  >
                    close
                  </Button>
                  <Button
                    type={"submit"}
                    variant="contained"
                    sx={{ bgcolor: "#ab003c" }}
                  >
                    Submit
                  </Button>
                </Grid>
              </Grid>
            </Paper>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default AddScreen;
