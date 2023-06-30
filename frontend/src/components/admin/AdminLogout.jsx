import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../services/Instance/AxiosInstance";

const AdminLogout = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      setTimeout(() => {
        
      }, 10);
      await axiosInstance.post("user_api/logoutuser/");
      localStorage.removeItem("token");
      navigate("/admin");
    } catch (error) {
      alert(error);
    }
    //   .then(navigate('/admin'))
    //   .then(
    //     localStorage.removeItem().then()
    //   )
  };
  // setTimeout(() => {
  //   localStorage.removeItem()
    
  // }, 10);

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

  return (
    <div>
      <Button
        variant="contained"
        sx={{
          width: { xl: "30%", lg: "30%", md: "40%", sm: "60%", xs: "70%" },
          color: "white",
          textTransform: "none",
          borderRadius: 5,
          bgcolor: "#f50057",
          "&:hover": { bgcolor: "#d81b60" },
        }}
        onClick={handleOpen}
      >
        Logout
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Grid
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography
              id="modal-modal-title"
              variant="h5"
              component="h2"
              sx={{ color: "#c51162" }}
            >
              Log out
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              You will be returned to the login screen
            </Typography>
          </Grid>
          <Grid
            sx={{
              width: "100%",
              height: "35px",
              display: "flex",
              justifyContent: "space-evenly",
              mt: 5,
            }}
          >
            <Button
              onClick={handleClose}
              variant="contained"
              sx={{ bgcolor: "#616161", "&:hover": { bgcolor: "#616161" } }}
            >
              Cancel
            </Button>
            <Button
              onClick={handleLogout}
              variant="contained"
              sx={{ bgcolor: "#00838f", "&:hover": { bgcolor: "#00838f" } }}
            >
              Logout
            </Button>
          </Grid>
        </Box>
      </Modal>
    </div>
  );
};

export default AdminLogout;
