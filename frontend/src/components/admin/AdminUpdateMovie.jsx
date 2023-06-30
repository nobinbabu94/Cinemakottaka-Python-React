import React, { useEffect, useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  NativeSelect,
  Paper,
  Select,
  TextField,
} from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import EditIcon from "@mui/icons-material/Edit";
import { useForm, Controller, set } from "react-hook-form";
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

const AdminUpdateMovie = ({ tmdb, nameMovie, category, status, Id }) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [checked, setChecked] = useState(true);
  const [statusUpdt, setStatusUpdt] = useState(status);
  const [language, setLanguage] = useState([]);
  const [categorylanguage, setCategorylanguage] = useState("");
  const [item, setItem] = useState("");
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

  // const handleChange = (event) => {
  //   setChecked(event.target.checked);
  //   setStatusUpdt(checked);
  //   console.log(statusUpdt);
  // };

  const onSubmit = async (data) => {
    try {
      // console.log(item, "kjhfkjhgkdhh");
      console.log(data, "kjhfkjhgkdhh");
      // console.log(id,'iddddd');
      await axiosInstance.patch(`/admin_api/updatemovie/${Id}/`,
      {tmdb_id : data.tmdbs, movie_name : data.movie, category_name : data.languages} 
       
      );

      // console.log(Id, "kjhfkjhgkdhh");
    } catch (e) {
      alert(e);
    }
  };

  // const handleLanguage = (event) => {
  //   setCategorylanguage(event.target.value);
  //   console.log(categorylanguage);
  // };

  useEffect(() => {
    try {
      (async () => {
        const data = await axiosInstance.get("/user_api/getallmoviecategory/");
        setLanguage(data.data);
        // setItem(id)
        // setCatid()
        console.log(data, "hhhhhhhh");
      })();
    } 
    catch (e) {
      alert(e);
    }
  }, []);

  return (
    <div>
      <Button sx={{ borderRadius: 8, boxShadow: 5 }} onClick={handleOpen}>
        <EditIcon />
      </Button>
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
                  <Typography variant="h5">Update Movie</Typography>
                </Grid>
                <Grid sx={{ mt: 5 }}>
                <Typography>Movie Id</Typography>
                 <Typography>{Id}</Typography>
                </Grid>
                <Grid sx={{ mt: 5 }}>
                  <TextField
                    
                    variant="standard"
                    label="TMDB ID"
                    placeholder="Tmdb id"
                    style={textStyle}
                    defaultValue={tmdb}
                    type="text"
                    {...register("tmdbs", { required: true })}
                  />
                  {errors.tmdbs && errors.tmdbs.type === "required" && (
                  <p
                    style={{
                      padding: 0,
                      margin: 0,
                      color: "#d50000",
                 
                    }}
                  >
                    Movie Name is required.
                  </p>
                )}
                </Grid>
                <Grid sx={{ mt: 2 }}>
                  <TextField
                    variant="standard"
                    label="Movie Name"
                    placeholder="Movie Name"
                    style={textStyle}
                    defaultValue={nameMovie}
                    type="text"
                    {...register("movie", { required: true })}
                  />
                  {errors.movie && errors.movie.required === true && (
                    <p
                      style={{
                        padding: 0,
                        margin: 0,
                        color: "#d50000",
                      }}
                    >
                      Movie Name id is required.
                    </p>
                  )}
                </Grid>
                
                <Grid sx={{ mt: 5 }}>
                  <TextField
                    select
                    fullWidth
                    defaultValue={category}
                    label="Select Language"
                    inputProps={register("languages", {
                      required: "Please enter currency",
                    })}
                   
                  >
                    {language.map((lang) => (
                      <MenuItem value={lang.id} key={lang.id}>
                        {lang.category_name}
                      </MenuItem>
                    ))}
                  </TextField>
                  
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

export default AdminUpdateMovie;
