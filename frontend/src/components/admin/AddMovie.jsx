import React, { useEffect, useState } from "react";
import Backdrop from "@mui/material/Backdrop";
// import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
} from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import EditIcon from "@mui/icons-material/Edit";
import { useForm, Controller } from "react-hook-form";
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

const AddMovie = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [language, setLanguage] = useState([]);
  const [categorylanguage, setCategorylanguage] = useState("");

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
      await axiosInstance.post("/admin_api/addmovie/", {
        movie_name: data.movie,
        category_name: data.languagelist,
        tmdb_id: data.tmdb,
      });
      handleClose(true);
    } catch (e) {
      alert(e);
    }
  };

  useEffect(() => {
    try {
      (async () => {
        const data = await axiosInstance.get("/user_api/getallmoviecategory/");
        setLanguage(data.data);
        // setItem(id)
        // setCatid()
        console.log(language, "hhhhhhhh");
      })();
    } catch (e) {
      alert(e);
    }
  }, []);

  const handleLanguage = (event) => {
    setCategorylanguage(event.target.value);
    console.log(categorylanguage);
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
                  <Typography variant="h5">Add Movie</Typography>
                </Grid>

                <Grid sx={{ mt: 5 }}>
                  <TextField
                    
                    variant="standard"
                    label="Movie Name"
                    placeholder="Movie Name"
                    style={textStyle}
                    type="string"
                    {...register("movie", { required: true })}
                  />
                  {errors.movie && errors.movie.type === "required" && (
                    <p
                      style={{
                        padding: 0,
                        margin: 0,
                        color: "#d50000",
                      }}
                    >
                      Movie field field is required.
                    </p>
                  )}
                </Grid>
                <Grid sx={{ mt: 5 }}>

                <TextField
                    select
                    fullWidth
                    label="Select District"
                    inputProps={register("languagelist", {
                      required: "Please enter currency",
                    })}
                  >
                    {language.map((lang) => (
                      <MenuItem value={lang.id} key={lang.id}>
                        {lang.category_name}
                      </MenuItem>
                    ))}
                  </TextField>
                  {errors.languagelist && errors.languagelist.type === "required" && (
                    <p
                      style={{
                        padding: 0,
                        margin: 0,
                        color: "#d50000",
                      }}
                    >
                      Language is required.
                    </p>
                  )}
                  {/* <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Language
                    </InputLabel>

                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={categorylanguage}
                      label="Language"
                      onChange={handleLanguage}
                    >
                      {language.map((lang) => (
                        <MenuItem value={lang.id} key={lang.id}>
                          {lang.category_name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl> */}
                </Grid>
                <Grid sx={{ mt: 3 }}>
                  <TextField
                    
                    variant="standard"
                    label="TMDB id"
                    placeholder="TMDB id"
                    style={textStyle}
                    type="string"
                    {...register("tmdb", { required: true })}
                  />
                  {errors.tmdb && errors.tmdb.type === "required" && (
                    <p
                      style={{
                        padding: 0,
                        margin: 0,
                        color: "#d50000",
                      }}
                    >
                      Tmdb id field is required.
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
                  <Button onClick={handleClose} variant="contained" sx={{bgcolor:'#616161',  "&:hover": { bgcolor: "#616161" }}}>
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

export default AddMovie;
