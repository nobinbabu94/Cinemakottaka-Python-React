import  React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Paper } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";

const theme = createTheme();


const VendorRegister = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [error, setError] = React.useState("");
  const navigate = useNavigate();
  const onSubmit = (data) => {
    // axios.post(baseURL, { phone_number: data.tel, password: data.password, })
    // .then((res) => {
    //     if (res.data.status === 400) {
    //         setError(res.data.message)
    //         console.log(res.data)
    //     }
    //     else {
    //         localStorage.setItem('token', res.data.token);
    //         console.log(res.data)
    //         navigate('/admin/home')
    //     }
    // })
    // .catch((err) => {
    //     console.log(err)
    // })
  };
  // const handleSubmit = (event) => {
  //     event.preventDefault();
  //     const data = new FormData(event.currentTarget);
  //     console.log({
  //         email: data.get('email'),
  //         password: data.get('password'),
  //     });
  // };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="sm">
        <CssBaseline />
        <Paper
          elevation={0}
          sx={{
            marginTop: { xl: 2, lg: 2, md: 2, sm: 6, xs: 3 },
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            // p:3
            backgroundColor: {
              xl: "transparent",
              lg: "transparent",
              md: "white",
              sm: "white",
              xs: "white",
            },
            p: { xl: 0, lg: 0, md: 3, sm: 3, xs: 3 },
          }}
        >
          <Typography
            sx={{
              fontSize: {
                xl: "2rem",
                lg: "2rem",
                md: "2rem",
                sm: "2rem",
                xs: "1.3rem",
              },
              fontWeight: "bold",
            }}
          >
            Become a Partner
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit(onSubmit)}
            sx={{
              mt: 3,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Grid container spacing={1.2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  size="small"
                  placeholder="First Name"
                  required
                  fullWidth
                  autoFocus
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& > fieldset": { borderColor: "grey" },
                    },

                    "& .MuiOutlinedInput-root:hover": {
                      "& > fieldset": {
                        borderColor: "grey",
                      },
                    },
                  }}
                  {...register("first_name", {
                    required: true,
                  })}
                />
                {errors.first_name && errors.first_name.type === "required" && (
                  <p
                    style={{
                      padding: 0,
                      margin: 0,
                      color: "#d50000",
                      fontSize: ".7rem",
                    }}
                  >
                    Please enter your first name
                  </p>
                )}
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  size="small"
                  required
                  fullWidth
                  type="text"
                  placeholder="Last Name"
                  sx={{
                    // input: { "&::placeholder": { textAlign: "center" } },
                    "& .MuiOutlinedInput-root": {
                      "& > fieldset": { borderColor: "grey" },
                    },

                    "& .MuiOutlinedInput-root:hover": {
                      "& > fieldset": {
                        borderColor: "grey",
                      },
                    },
                  }}
                  {...register("last_name", {
                    required: true,
                  })}
                />
                {errors.last_name && errors.last_name.type === "required" && (
                  <p
                    style={{
                      padding: 0,
                      margin: 0,
                      color: "#d50000",
                      fontSize: ".7rem",
                    }}
                  >
                    Please enter your Last Name
                  </p>
                )}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  size="small"
                  required
                  fullWidth
                  type="email"
                  placeholder="Email Address"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& > fieldset": { borderColor: "grey" },
                    },

                    "& .MuiOutlinedInput-root:hover": {
                      "& > fieldset": {
                        borderColor: "grey",
                      },
                    },
                  }}
                  {...register("email", {
                    required: true,
                  })}
                />
                {errors.email && errors.email.type === "required" && (
                  <p
                    style={{
                      padding: 0,
                      margin: 0,
                      color: "#d50000",
                      fontSize: ".7rem",
                    }}
                  >
                    Please enter your email address
                  </p>
                )}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  size="small"
                  required
                  fullWidth
                  placeholder="Phone Number"
                  type="tel"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& > fieldset": { borderColor: "grey" },
                    },

                    "& .MuiOutlinedInput-root:hover": {
                      "& > fieldset": {
                        borderColor: "grey",
                      },
                    },
                  }}
                  {...register("phone_number", {
                    required: true,
                  })}
                />
                {errors.phone_number &&
                  errors.phone_number.type === "required" && (
                    <p
                      style={{
                        padding: 0,
                        margin: 0,
                        color: "#d50000",
                        fontSize: ".7rem",
                      }}
                    >
                      Please enter your phone number
                    </p>
                  )}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  size="small"
                  required
                  fullWidth
                  placeholder="Password"
                  type="password"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& > fieldset": { borderColor: "grey" },
                    },

                    "& .MuiOutlinedInput-root:hover": {
                      "& > fieldset": {
                        borderColor: "grey",
                      },
                    },
                  }}
                  {...register("password", {
                    required: true,
                  })}
                />
                {errors.password && errors.password.type === "required" && (
                  <p
                    style={{
                      padding: 0,
                      margin: 0,
                      color: "#d50000",
                      fontSize: ".7rem",
                    }}
                  >
                    Please enter your password
                  </p>
                )}
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  size="small"
                  required
                  fullWidth
                  placeholder="District"
                  type="text"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& > fieldset": { borderColor: "grey" },
                    },

                    "& .MuiOutlinedInput-root:hover": {
                      "& > fieldset": {
                        borderColor: "grey",
                      },
                    },
                  }}
                  {...register("district", {
                    required: true,
                  })}
                />
                {errors.district && errors.district.type === "required" && (
                  <p
                    style={{
                      padding: 0,
                      margin: 0,
                      color: "#d50000",
                      fontSize: ".7rem",
                    }}
                  >
                    Please enter your district name
                  </p>
                )}
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  size="small"
                  required
                  fullWidth
                  placeholder="City"
                  type="text"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& > fieldset": { borderColor: "grey" },
                    },

                    "& .MuiOutlinedInput-root:hover": {
                      "& > fieldset": {
                        borderColor: "grey",
                      },
                    },
                  }}
                  {...register("city", {
                    required: true,
                  })}
                />
                {errors.city && errors.city.type === "required" && (
                  <p
                    style={{
                      padding: 0,
                      margin: 0,
                      color: "#d50000",
                      fontSize: ".7rem",
                    }}
                  >
                    Please enter your city name
                  </p>
                )}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  size="small"
                  required
                  fullWidth
                  placeholder="City Enquiry"
                  type="text"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& > fieldset": { borderColor: "grey" },
                    },

                    "& .MuiOutlinedInput-root:hover": {
                      "& > fieldset": {
                        borderColor: "grey",
                      },
                    },
                  }}
                  {...register("city_enquiry", {
                    required: true,
                  })}
                />
                {errors.city_enquiry &&
                  errors.city_enquiry.type === "required" && (
                    <p
                      style={{
                        padding: 0,
                        margin: 0,
                        color: "#d50000",
                        fontSize: ".7rem",
                      }}
                    >
                      Please fill the city enquiry field
                    </p>
                  )}
              </Grid>
              <Grid item xs={2}>
                {/* <Button
                  sx={{
                    bgcolor: "#b71c1c",
                    borderRadius: 4,
                    "&:hover": { bgcolor: "#e53935", },
                  }}
                  fullWidth
                  variant="contained"
                >
                  Add
                </Button> */}
              </Grid>
            </Grid>
            <Button
              type="submit"
              variant="contained"
              sx={{
                width: "60%",
                mt: 2,
                mb: 2,
                textTransform: "none",
                borderRadius: 5,
                bgcolor: "red",
                "&:hover": { bgcolor: "#d50000" },
              }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Typography>
                  Already have an account?
                  <Link
                    to="/partners"
                    style={{
                      textDecoration: "none",
                      color: "#4a0000",
                      fontWeight: "bold",
                    }}
                  >
                    
                    Sign in
                  </Link>
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Container>
    </ThemeProvider>
  );
};

export default VendorRegister;
