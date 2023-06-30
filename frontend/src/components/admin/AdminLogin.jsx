import { Button, Grid, TextField } from "@mui/material";
import React, { useState } from "react";
import PersonIcon from "@mui/icons-material/Person";
import KeyIcon from "@mui/icons-material/Key";
// import Image from '../assets'
import AdPng from "../../assets/admin png.png";
import { useForm } from "react-hook-form";
// import axios from "axios";
import { useNavigate } from "react-router-dom";
import axios from "../../services/Instance/AxiosInstance";

import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import { useEffect } from "react";

const AdminLogin = () => {
  const navigate = useNavigate();
  const [value, setValue] = useState([]);
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [error, setError] = useState("");

  const onSubmit = async (data) => {
    await axios
      .post(
        "/user_api/loginuser/",
        {
          phone_number: data.tel,
          password: data.password,
        },
        console.log(data, "jjjjjjj")
      )
      .then((res) => {
        console.log(res);
        if (res.data.status === 400) {
          setError(res.data.message);
        } else {
          localStorage.setItem("token", res.data.token);
          console.log(res.data, "response login");
          setValue(res.data);
          setLoading(true);
          setTimeout(() => {
            navigate("/admin/home");
          }, 2000);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const containerStyle = {
    width: "400px",
    height: "450px",
    mt: 10,
    mb: 10,
    display: { xl: "flex", lg: "Box" },
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#bdbdbd",
    // backgroundImage: `url(${Image})`,
    borderRadius: 0,
    boxShadow: "1px 10px 8px 1px black",
  };

  const inputStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "75%",
    gap: 3,
    mt: 4,
  };

  const headerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    mb: 2,
    mt: 3,
    width: "75%",
  };

  return (
    <>
      <Grid container sx={containerStyle}>
        <Grid Item sx={headerStyle}>
          <img width="20%" src={AdPng} alt="" />
          <br />
          <h2
            style={{
              padding: 0,
              margin: 0,
              fontSize: "1.3em",
            }}
          >
            ADMIN PANEL
          </h2>
          <p style={{ padding: 0, margin: 0, fontSize: ".8em" }}>
            Control panel login
          </p>
        </Grid>

        <Grid
          Item
          sx={inputStyle}
          component="form"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Grid sx={{ width: "100%" }}>
            <PersonIcon style={{ color: "#757575", opacity: 5 }} />
            <TextField
              variant="standard"
              id="standard-basic"
              InputProps={
                {
                  // style: { color: "white", },
                }
              }
              style={{ width: "90%", paddingLeft: 5 }}
              placeholder="Phone Number"
              autoFocus
              type="tel"
              {...register("tel", {
                required: true,
                // pattern: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/
              })}
            />
            {errors.tel && errors.tel.type === "required" && (
              <p
                style={{
                  padding: 0,
                  margin: 0,
                  color: "#d50000",
                  paddingLeft: 30,
                }}
              >
                Email is required.
              </p>
            )}
            {/* {errors.email && errors.email.type === "pattern" && (
            <p style={{ padding: 0, margin: 0, color: '#b71c1c', paddingLeft: 30 }}>Email is not valid.</p>
        )} */}
          </Grid>
          <Grid sx={{ width: "100%", gap: 3 }}>
            <KeyIcon style={{ color: "#757575" }} />
            <TextField
              variant="standard"
              id="standard-basic"
              // InputProps={{ style: { color: "white" } }}
              style={{ width: "90%", paddingLeft: 5 }}
              placeholder="Password"
              type="password"
              {...register("password", {
                required: true,
                minLength: 6,
              })}
            />
            {errors.password && errors.password.type === "required" && (
              <p
                style={{
                  padding: 0,
                  margin: 0,
                  color: "#d50000",
                  paddingLeft: 30,
                }}
              >
                Password is required.
              </p>
            )}
            {errors.password && errors.password.type === "minLength" && (
              <p
                style={{
                  padding: 0,
                  margin: 0,
                  color: "#d50000",
                  paddingLeft: 30,
                }}
              >
                Password should be at-least 6 characters.
              </p>
            )}
            {
              <p
                style={{
                  padding: 0,
                  margin: 0,
                  color: "#d50000",
                  paddingLeft: 30,
                }}
              >
                {error}
              </p>
            }
          </Grid>

          <Grid sx={{ width: "100%", gap: 3 }}>
            <Button
              fullWidth
              type="submit"
              sx={{
                bgcolor: " blue",
                borderRadius: 5,
                color: "white",
                "&:hover": { backgroundColor: "blue" },
              }}
            >
              Submit
            </Button>
            {loading === true ? <LinearProgress width={"200px"} /> : ""}
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default AdminLogin;
