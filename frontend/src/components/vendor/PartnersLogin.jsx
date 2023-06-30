import { Button, Grid, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, Navigate, useNavigate } from "react-router-dom";
import axiosInstance from "../../services/Instance/AxiosInstance";

const PartnersLogin = () => {
  const [error, setError] = useState("");

  const navigate = useNavigate()


  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      console.log(data, "hellooooo");
      await axiosInstance.post('/vendor_api/loginvendor/',{email:data.emailid, password:data.passwordno})
      
      .then((res) => {
        if (res.data.status === 400) {
          setError(res.data.message);
        } else {
          localStorage.setItem("token", res.data.token);
          console.log(res.data, "response login");
          // setValue(res.data);
          // setLoading(true);
          // setTimeout(() => {
            navigate('/partners/home');
          // }, 2000);
        }


        // if (res.data.status === 400) {
        //   setError(res.data.message);
        // } else {
        //   localStorage.setItem("token", res.data.token);
        //   console.log(res.data, "response login");
        //   // setValue(res.data);
        //   // setLoading(true);
        //   setTimeout(() => {
        //     navigate('/partners/home');
        //   }, 2000);
        // }
      })
    } catch (e) {
      alert(e);
    }
  };

  const containerStyle = {
    width: { xl: "30%", lg: "30%", md: "40%", sm: "60%", xs: "90%" },
    height: "50vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: { xl: 3, lg: 2, md: 1, sm: 2, xs: 1 },
    mt: { xl: 4, lg: 6, md: 8, sm: 10, xs: 10 },
  };

  const headerStyle = {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  };

  const textfieldStyles = {
    "& .MuiOutlinedInput-root": {
      "& > fieldset": { borderColor: "grey" },
    },
    "& .MuiOutlinedInput-root:hover": {
      "& > fieldset": {
        borderColor: "red",
      },
    },
  };

  const inputStyle = {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 1,
    pt: { xl: 3, lg: 2, md: 2, sm: 2, xs: 1 },
  };
  const submitStyle = {
    width: "40%",
  };

  return (
    <>
      <Grid sx={containerStyle}>
        <Grid item sx={headerStyle}>
          <Typography
            sx={{
              fontSize: {
                xl: "2rem",
                lg: "2rem",
                md: "1.7rem",
                sm: "1.5rem",
                xs: "1.4rem",
              },
              fontWeight: "bold",
            }}
          >
            Welcome back!
          </Typography>
          <Typography>Office portal by CinemaBooker</Typography>
        </Grid>
        <Grid
          item
          sx={inputStyle}
          component="form"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Grid>
            <TextField
              size="small"
              placeholder="Email"
              type="email"
              sx={textfieldStyles}
              {...register("emailid", {
                required: true,
              })}
            />

            {errors.emailid && errors.emailid.type === "required" && (
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
          <Grid>
            <TextField
              size="small"
              placeholder="Password"
              type="password"
              sx={textfieldStyles}
              {...register("passwordno", {
                required: true,
              })}
            />
            {errors.passwordno && errors.passwordno.type === "required" && (
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
            {
              <p
                style={{
                  padding: 0,
                  margin: 0,
                  color: "#d50000",
                  fontSize: ".7rem",
                }}
              >
                {error}
              </p>
            }
          </Grid>
          <Grid item sx={submitStyle}>
            <Button
              variant="contained"
              fullWidth
              type={"submit"}
              sx={{
                textTransform: "none",
                borderRadius: 5,
                bgcolor: "red",
                "&:hover": { bgcolor: "#d50000" },
              }}
            >
              Submit
            </Button>
          </Grid>
        </Grid>

        <Grid>
          <Typography>
            Don't you have an account?
            <Link
              to="/partners/register"
              style={{
                textDecoration: "none",
                color: "#4a0000",
                fontWeight: "bold",
              }}
            >
              {" "}
              Sign up
            </Link>
          </Typography>
        </Grid>
      </Grid>
    </>
  );
};

export default PartnersLogin;
