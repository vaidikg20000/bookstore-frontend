"use client";
import { useState,useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import * as Yup from "yup";
import axios from "axios";
// import { signupSchema } from "@/utils/validationSchema";



const SignUpForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);

  const usernameRegex = /^[a-zA-Z0-9_]{4,}$/; // Username must be at least 4 characters and contain only letters, numbers, or underscores
  const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d).{6,}$/; // Password must be at least 6 characters and contain at least one letter and one number

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    validateField(name, value);
  };

  const validateField = (name, value) => {
    let errorMessage = '';

    if (name === 'username' && !usernameRegex.test(value)) {
      errorMessage = 'Username must be at least 4 characters and contain only letters, numbers, or underscores';
    } else if (name === 'password' && !passwordRegex.test(value)) {
      errorMessage = 'Password must be at least 6 characters and contain at least one letter and one number';
    }

    setErrors({ ...errors, [name]: errorMessage });

    // Check if all fields are filled and valid, then enable the submit button
    if (formData.username && formData.password && formData.confirmPassword && !errorMessage) {
      setIsSubmitDisabled(false);
    } else {
      setIsSubmitDisabled(true);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Custom confirm password validation
    if (formData.password !== formData.confirmPassword) {
      setErrors({ confirmPassword: 'Passwords do not match' });
      setIsSubmitDisabled(true);
      return;
    }

    // If confirm password is valid, proceed with other validations
    if (!usernameRegex.test(formData.username) || !passwordRegex.test(formData.password)) {
      // Validation failed
      return;
    }

    // If validations pass, send the signup data (formData) to your server using an HTTP request (Axios).
    axios
      .post('http://localhost:5000/api/signup', formData)
      .then((response) => {
        // Handle the server response (e.g., show a success message or error message).
        console.log(response.data);

        // Reset the form and disable submit button
        setFormData({
          username: '',
          password: '',
          confirmPassword: '',
        });
        setErrors({});
        setIsSubmitDisabled(true);
      })
      .catch((error) => {
        // Handle Axios errors or server errors (e.g., display an error message to the user).
        console.error(error);
      });
  };
  // const isSubmitDisabled = Object.values(errors).some((error) => !!error);
  return (
    <>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="username"
              name="username"
              autoComplete="username"
              autoFocus
              value={formData.username}
              onChange={handleChange}
              error={!!errors.username}
              helperText={errors.username}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={formData.password}
              onChange={handleChange}
              error={!!errors.password}
              helperText={errors.password}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="confirmPassword"
              label="Confirm Password"
              type="password"
              id="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={isSubmitDisabled}
            >
              Sign In
            </Button>

            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Already have an account? Login"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        {/* <Copyright sx={{ mt: 8, mb: 4 }} /> */}
      </Container>
    </>
  );
};

export default SignUpForm;
