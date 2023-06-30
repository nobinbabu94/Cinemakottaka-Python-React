// import React, { useState } from "react";
// import Backdrop from "@mui/material/Backdrop";
// import Box from "@mui/material/Box";
// import Modal from "@mui/material/Modal";
// import Fade from "@mui/material/Fade";
// import Button from "@mui/material/Button";
// import Typography from "@mui/material/Typography";
// import { Grid, Paper, TextField } from "@mui/material";
// import Checkbox from "@mui/material/Checkbox";
// import EditIcon from "@mui/icons-material/Edit";
// import { useForm, Controller } from "react-hook-form";
// import axiosInstance from "../services/Instance/AxiosInstance";

// const style = {
//   position: "absolute",
//   top: "50%",
//   left: "50%",
//   transform: "translate(-50%, -50%)",
//   width: 400,
//   bgcolor: "background.paper",
//   border: "2px solid #000",
//   boxShadow: 24,
//   p: 4,
// };

// const AdminUpdateUsers = ({ id, username, email, phoneno, status }) => {
//   const [open, setOpen] = React.useState(false);
//   const handleOpen = () => setOpen(true);
//   const handleClose = () => setOpen(false);
//   const [checked, setChecked] = useState(false);
//   const [val, setVal] = useState(status);

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm();

//   const textStyle = {
//     display: "flex",
//     width: "auto",
//     m: 1,
//   };

//   const paperStyle = {
//     padding: 5,
//     height: "auto",
//     mb: 3,
//   };

//   const onSubmit = async (data) => {
//     try {
        
//       console.log(data, "hellooooo");
//       await 
//     } catch (e) {
//       alert(e);
//     }
//   };
//   const blockUser = async (id) => {
//     try {
//       console.log(id);
//       await axiosInstance.patch(`/admin_api/blockuser/${id}/`, id);
//     } catch (error) {
//       console.log(error);
//     }

//     // /admin_api/blockvendor/{id}/
//   };

//   const handleChange = (event) => {
//     setChecked(event.target.checked);
//     blockUser();
//   };

//   return (
//     <div>
//       <Button sx={{ borderRadius: 8, boxShadow: 5 }} onClick={handleOpen}>
//         <EditIcon />
//       </Button>
//       <Modal
//         aria-labelledby="transition-modal-title"
//         aria-describedby="transition-modal-description"
//         open={open}
//         onClose={handleClose}
//         closeAfterTransition
//       >
//         <Fade in={open}>
//           <Box sx={style}>
//             <Paper
//               elevation={5}
//               component="form"
//               sx={paperStyle}
//               onSubmit={handleSubmit(onSubmit)}
//             >
//               <Grid>
//                 <Grid sx={{ display: "flex", justifyContent: "center" }}>
//                   <Typography variant="h5">Update Users</Typography>
//                 </Grid>
//                 <Grid sx={{ mt: 5 }}>
//                   <TextField
//                     required
//                     variant="standard"
//                     label="Username"
//                     placeholder="Username"
//                     style={textStyle}
//                     defaultValue={username}
//                     type="text"
//                     {...register("tmbd", { required: true })}
//                   />
//                   {errors.tmdb && errors.tmdb.required === true && (
//                     <p
//                       style={{
//                         padding: 0,
//                         margin: 0,
//                         color: "#d50000",
//                         paddingLeft: 30,
//                       }}
//                     >
//                       Email is required.
//                     </p>
//                   )}
//                 </Grid>
//                 <Grid sx={{ mt: 2 }}>
//                   <TextField
//                     required
//                     variant="standard"
//                     label="Email"
//                     placeholder="Email"
//                     style={textStyle}
//                     defaultValue={email}
//                     type="text"
//                     {...register("movie", { required: true })}
//                   />
//                 </Grid>
//                 <Grid sx={{ mt: 2 }}>
//                   <TextField
//                     required
//                     variant="standard"
//                     label="Phone Number"
//                     placeholder="Phone Number"
//                     style={textStyle}
//                     defaultValue={phoneno}
//                     type="text"
//                     {...register("phonenumber", { required: true })}
//                   />
//                   {errors.tmdb && errors.tmdb.required === true && (
//                     <p
//                       style={{
//                         padding: 0,
//                         margin: 0,
//                         color: "#d50000",
//                         paddingLeft: 30,
//                       }}
//                     >
//                       Email is required.
//                     </p>
//                   )}
//                 </Grid>
//                 <Grid sx={{ mt: 2 }}>
//                   <Checkbox
//                     checked={checked}
//                     onChange={handleChange}
//                     type="checkbox"
//                     ref={{ ...register("statusbox") }}
//                     inputProps={{ "aria-label": "controlled" }}
//                   />
//                   <Typography sx={{ m: 0 }}>is active</Typography>
//                 </Grid>
//                 <Grid sx={{ mt: 2, display: "flex", justifyContent: "center" }}>
//                   <Button type={"submit"} variant="contained">
//                     Submit
//                   </Button>
//                 </Grid>
//               </Grid>
//             </Paper>
//           </Box>
//         </Fade>
//       </Modal>
//     </div>
//   );
// };

// export default AdminUpdateUsers;
