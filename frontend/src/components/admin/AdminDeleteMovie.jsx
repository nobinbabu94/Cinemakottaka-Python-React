import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import DeleteIcon from "@mui/icons-material/Delete";
import axiosInstance from "../../services/Instance/AxiosInstance";
import { Divider, Grid } from "@mui/material";

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

const AdminDeleteMovie = ({ id, movie }) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const deleteMovie = async (id) => {
    try {
      console.log(id, "delete movie id");
      await axiosInstance.delete(`admin_api/updatemovie/${id}/`, id);
      handleClose();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Button onClick={handleOpen}>
        <DeleteIcon sx={{ color: "red", "&:hover": { color: "red" } }} />{" "}
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Delete Confirmation
          </Typography>
          <Divider />
          <Grid
            sx={{
              mt: 2,
              width: "100%",
              height: "60px",
              bgcolor: "#ffebee",
              borderRadius: 1,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography color="#b71c1c" id="modal-modal-description" >
              Are you sure you want to delete the movie "{movie}"
            </Typography>
            <Divider />
          </Grid>
          <Grid
            sx={{ mt: 5, display: "flex", justifyContent: "center", gap: 5 }}
          >
            <Divider />
            <Button
              onClick={handleClose}
              variant="contained"
              sx={{ bgcolor: "#616161", "&:hover": { bgcolor: "#616161" } }}
            >
              close
            </Button>
            <Button
              onClick={() => {
                deleteMovie(id);
              }}
              type={"submit"}
              variant="contained"
              sx={{ bgcolor: "#ab003c" }}
            >
              Delete
            </Button>
          </Grid>
        </Box>
      </Modal>
    </div>
  );
};

export default AdminDeleteMovie;
