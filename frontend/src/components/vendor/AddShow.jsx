import React, { useEffect, useState } from "react";
import Backdrop from "@mui/material/Backdrop";
// import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Grid, MenuItem, Paper, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import axiosInstance from "../../services/Instance/AxiosInstance";

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

const AddShow = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [movies, setMovies] = useState([]);
  const [screens, setScreens] = useState([]);
  const [dates, setDates] = useState([]);
  const [times, setTimes] = useState([]);

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
      await axiosInstance.post("/vendor_api/addshow/", {
        district: data.district,
      });
      handleClose();
    } catch (e) {
      alert(e);
    }
  };

  useEffect(() => {
    try {
      (async () => {
        // const data = await axiosInstance.get("/admin_api/moviedetails/");
        // setMovies(data.data);
        const screendata = await axiosInstance.get("/vendor_api/getallscreen/");
        setScreens(screendata.data);
        //get date
        // const datedata = await axiosInstance.get("/vendor_api/getallscreen/");
        // setDates(datedata.data)
        //get time
        // const timedata = await axiosInstance.get("/vendor_api/getallscreen/");
        // setTimes(timedata.data)
        // setItem(id)
        // setCatid()
        console.log(screendata, "addd show movie list");
      })();
    } catch (e) {
      alert(e);
    }
  }, [open]);

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
                  <Typography variant="h5">Add Show</Typography>
                </Grid>

                <Grid sx={{ mt: 5 }}>
                  <TextField
                    select
                    fullWidth
                    label="Select Movie"
                    inputProps={register("moviename", {
                      required: "Please enter currency",
                    })}
                  >
                    {movies.map((movie) => (
                      <MenuItem value={movie.id} key={movie.id}>
                        {movie.movie_name}
                      </MenuItem>
                    ))}
                  </TextField>
                  {errors.moviename && errors.moviename.type === "required" && (
                    <p
                      style={{
                        padding: 0,
                        margin: 0,
                        color: "#d50000",
                      }}
                    >
                      Movie is required.
                    </p>
                  )}
                </Grid>
                <Grid sx={{ mt: 5 }}>
                  <TextField
                    select
                    fullWidth
                    label="Select Screen"
                    inputProps={register("screenname", {
                      required: "Please enter currency",
                    })}
                  >
                    {screens.map((screen) => (
                      <MenuItem value={screen.id} key={screen.id}>
                        {screen.screen_name}
                      </MenuItem>
                    ))}
                  </TextField>
                  {errors.screenname &&
                    errors.screenname.type === "required" && (
                      <p
                        style={{
                          padding: 0,
                          margin: 0,
                          color: "#d50000",
                        }}
                      >
                        Movie is required.
                      </p>
                    )}
                </Grid>
                <Grid sx={{ mt: 5 }}>
                  <TextField
                    select
                    fullWidth
                    label="Select Date"
                    inputProps={register("dates_id", {
                      required: "Please enter currency",
                    })}
                  >
                    {dates.map((date) => (
                      <MenuItem value={date.id} key={date.id}>
                        {date.movie_name}
                      </MenuItem>
                    ))}
                  </TextField>
                  {errors.dates_id && errors.dates_id.type === "required" && (
                    <p
                      style={{
                        padding: 0,
                        margin: 0,
                        color: "#d50000",
                      }}
                    >
                      Movie is required.
                    </p>
                  )}
                </Grid>
                <Grid sx={{ mt: 5 }}>
                  <TextField
                    select
                    fullWidth
                    label="Select Time"
                    inputProps={register("times_id", {
                      required: "Please enter time",
                    })}
                  >
                    {times.map((time) => (
                      <MenuItem value={time.id} key={time.id}>
                        {time.movie_name}
                      </MenuItem>
                    ))}
                  </TextField>
                  {errors.times_id && errors.times_id.type === "required" && (
                    <p
                      style={{
                        padding: 0,
                        margin: 0,
                        color: "#d50000",
                      }}
                    >
                      Time is required.
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

export default AddShow;
