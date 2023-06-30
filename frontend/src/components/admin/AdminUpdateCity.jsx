import React, { useEffect, useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Grid, MenuItem, Paper, TextField } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import EditIcon from "@mui/icons-material/Edit";
import { useForm, Controller } from "react-hook-form";
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

const AdminUpdateCity = ({ city, district, Id }) => {
  const [open, setOpen] = React.useState(false);
  const [districtlist, setDistrictlist] = useState([]);

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
      // console.log(item, "kjhfkjhgkdhh");
      console.log(data, "update cities");
      // console.log(id,'iddddd');
      await axiosInstance.patch(`admin_api/updatecity/${Id}/`, {
        city: data.citiesall,
        district: data.districtsall,
      });
      handleClose();

      // console.log(Id, "kjhfkjhgkdhh");
    } catch (e) {
      alert(e);
    }
  };

  useEffect(() => {
    try {
      (async () => {
        const data = await axiosInstance.get("/admin_api/getdistricts/");
        setDistrictlist(data.data);
        // setItem(id)
        // setCatid()
        console.log(data, "hhhhhhhh");
      })();
    } catch (e) {
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
                  <Typography variant="h5">Update City</Typography>
                </Grid>

                <Grid sx={{ mt: 5 }}>
                  <TextField
                    variant="standard"
                    label="City"
                    placeholder="City"
                    style={textStyle}
                    defaultValue={city}
                    type="text"
                    {...register("citiesall", { required: true })}
                  />
                </Grid>
                {errors.citiesall && errors.citiesall.type === "required" && (
                  <p
                    style={{
                      padding: 0,
                      margin: 0,
                      color: "#d50000",
                    }}
                  >
                    city is required.
                  </p>
                )}
                <Grid sx={{ mt: 2 }}>
                  <TextField
                    select
                    fullWidth
                    defaultValue={district}
                    label="Select"
                    inputProps={register("districtsall", {
                      required: "Please enter currency",
                    })}
                  >
                    {districtlist.map((dist) => (
                      <MenuItem value={dist.id} key={dist.id}>
                        {dist.district}
                      </MenuItem>
                    ))}
                  </TextField>
                  {/* <TextField
                    required
                    variant="standard"
                    label="District"
                    placeholder="District"
                    style={textStyle}
                    defaultValue={district}
                    type="text"
                    {...register("category", { required: true })}
                  /> */}
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

export default AdminUpdateCity;
