import { useEffect, useState } from "react";
import {
  FormLabel,
  TextField,
  Button,
  Card,
  CardContent,
  CardHeader,
  Grid,
  Alert,
  AlertTitle,
  Collapse,
  IconButton,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import Api from "../utils/Api";
import CloseIcon from "@mui/icons-material/Close";
import { useFormik } from "formik";
import * as Yup from "yup"; //Validation library

const Signup = () => {
  //States
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      password: "",
    },
    validationSchema: Yup.object({
      firstName: Yup.string()
        .min(2, "Must be at least 2 characters long")
        .max(30, "Must be 30 characters or less")
        .required("First name is a required field"),
      lastName: Yup.string()
        .min(2, "Must be at least 2 characters long")
        .max(30, "Must be 30 characters or less")
        .required("Last name is a required field"),
      email: Yup.string()
        .max(50, "Must be 50 characters or less")
        .required("Email is a required field")
        .email("Email format is incorrect"),
      phoneNumber: Yup.number()
        // .max(11, "Must have less than 11 digits")
        // .min(10, "Must have 10 digits 0")
        .required("Phone number is a required field"),
      password: Yup.string()
        .min(10, "Must be at least 10 characters")
        .max(60, "Cannot exceed 60 characters")
        .required("Password is a required field")
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{10,60}$/,
          "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
        ),
    }),
    onSubmit: async (values) => {
      //Prevent default and for validation happens by default

      const userData = {
        ...values,
      };

      //Make request to backend
      const status = await registerAPIRequest(userData);

      // If it returns a user (something not null) then redirect
      if (status) {
        navigate("/login?registration=true");
      }
    },
  });

  let timeout;

  const navigate = useNavigate();

  const registerAPIRequest = async (data) => {
    try {
      const request = await Api.post(`user`, {
        ...data,
        phoneNumber: String(data.phoneNumber),
      });
      const response = await request.data;
      return response;
    } catch (e) {
      if (e.data.status === "ERR_VALIDATION") {
        setErrorMessage(
          "The information presented is incorrect, please modify and try again"
        );
      } else {
        setErrorMessage(
          "This user already exists in the system. Please change email or phone number and try again"
        );
      }
      setError(true);
      timeout = setTimeout(() => {
        setError(false);
      }, 5000);
      console.error(e);
    }
  };

  useEffect(() => {
    return () => {
      clearTimeout(timeout);
    };
  }, [timeout]);

  return (
    <>
      <Collapse in={error}>
        <Alert
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setError(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}
          severity="error"
        >
          <AlertTitle>Error</AlertTitle>
          {errorMessage}
        </Alert>
      </Collapse>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        justify="center"
        style={{ minHeight: "100vh" }}
      >
        <Grid item xs={3}>
          <Card>
            <CardHeader title="Signup Form" />
            <CardContent>
              <form onSubmit={formik.handleSubmit}>
                <Grid
                  container
                  direction={"row"}
                  spacing={2}
                  sx={{ marginBottom: 4 }}
                >
                  <Grid item xs={12} sm={6}>
                    <Grid item xs={12}>
                      <FormLabel>First Name*</FormLabel>
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        type="text"
                        variant="outlined"
                        color="secondary"
                        placeholder="First Name"
                        name="firstName"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.firstName}
                        fullWidth
                        required
                        inputProps={{
                          maxLength: 30,
                        }}
                        error={
                          formik.touched.firstName && formik.errors.firstName
                            ? true
                            : false
                        }
                        helperText={
                          formik.touched.firstName && formik.errors.firstName
                        }
                      />
                    </Grid>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Grid item xs={12}>
                      <FormLabel>Last Name*</FormLabel>
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        type="text"
                        variant="outlined"
                        color="secondary"
                        placeholder="Last Name"
                        name="lastName"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.lastName}
                        fullWidth
                        required
                        inputProps={{
                          maxLength: 30,
                        }}
                        error={
                          formik.touched.lastName && formik.errors.lastName
                            ? true
                            : false
                        }
                        helperText={
                          formik.touched.lastName && formik.errors.lastName
                        }
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <FormLabel>Email*</FormLabel>
                <TextField
                  type="email"
                  variant="outlined"
                  color="secondary"
                  placeholder="Email"
                  name="email"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                  fullWidth
                  required
                  sx={{ mb: 4 }}
                  inputProps={{
                    maxLength: 50,
                  }}
                  error={
                    formik.touched.email && formik.errors.email ? true : false
                  }
                  helperText={formik.touched.email && formik.errors.email}
                ></TextField>
                <FormLabel>Phone number*</FormLabel>
                <TextField
                  type="number"
                  variant="outlined"
                  color="secondary"
                  placeholder="Phone number"
                  name="phoneNumber"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.phoneNumber}
                  fullWidth
                  required
                  sx={{ mb: 4 }}
                  error={
                    formik.touched.phoneNumber && formik.errors.phoneNumber
                      ? true
                      : false
                  }
                  helperText={
                    formik.touched.phoneNumber && formik.errors.phoneNumber
                  }
                />
                <FormLabel>Password*</FormLabel>
                <TextField
                  type="password"
                  variant="outlined"
                  color="secondary"
                  placeholder="Enter your password"
                  name="password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                  fullWidth
                  required
                  sx={{ mb: 4 }}
                  inputProps={{
                    maxLength: 60,
                  }}
                  error={
                    formik.touched.password && formik.errors.password
                      ? true
                      : false
                  }
                  helperText={formik.touched.password && formik.errors.password}
                ></TextField>
                <Button variant="outlined" type="submit">
                  Register
                </Button>
              </form>
              <small>
                Already have an account? <Link to="/login">Login Here</Link>
              </small>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};
export default Signup;
