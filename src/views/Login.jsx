import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, setAUTH } from "../redux/auth";
import { useNavigate, useSearchParams } from "react-router-dom";
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
import { Link } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import { useFormik } from "formik";
import * as Yup from "yup"; //Validation library

const Login = () => {
  //States
  const [success, setSuccess] = useState(false);
  const [toggleErrorMessage, setToggleErrorMessage] = useState(true);

  //Redux states
  const { loading, error } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  // eslint-disable-next-line no-unused-vars
  const [searchParams, setSearchParams] = useSearchParams();

  //Form validation
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .max(50, "Must be 50 characters or less")
        .required("Email is a required field")
        .email("Email format is incorrect"),
      password: Yup.string()
        .min(10, "Must be at least 10 characters")
        .max(60, "Cannot exceed 60 characters")
        .required("Password is a required field")
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{10,60}$/,
          "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
        ),
    }),
    onSubmit: async (values, { resetForm }) => {
      //Prevent default and for validation happens by default

      setToggleErrorMessage(true);

      let userCredentials = {
        ...values,
      };

      //Make request to backend using redux and redirect if credentials are correct
      dispatch(loginUser(userCredentials)).then(({ payload }) => {
        if (payload) {
          dispatch(setAUTH(payload));
          resetForm();
          navigate("/");
        }
      });
    },
  });

  useEffect(() => {
    let timeout;
    if (searchParams.get("registration") === "true") {
      setSuccess(true);
      timeout = setTimeout(() => {
        setSuccess(false);
        searchParams.delete("registration");
        setSearchParams(searchParams);
      }, 5000);
      return () => {
        clearTimeout(timeout);
      };
    }
  }, []);

  return (
    <>
      {error && (
        <Collapse in={toggleErrorMessage}>
          <Alert
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  setToggleErrorMessage(false);
                }}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
            sx={{ mb: 2 }}
            severity="error"
          >
            <AlertTitle>Error</AlertTitle>
            {error}
          </Alert>
        </Collapse>
      )}
      <Collapse in={success}>
        <Alert
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setSuccess(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}
          severity="success"
        >
          <AlertTitle>Success</AlertTitle>User created successfully
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
            <CardHeader title="Login Form" />
            <CardContent>
              <form autoComplete="off" onSubmit={formik.handleSubmit}>
                <FormLabel>Email</FormLabel>
                <TextField
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  required
                  variant="outlined"
                  type="email"
                  placeholder="Enter your email"
                  name="email"
                  sx={{ mb: 3 }}
                  fullWidth
                  value={formik.values.email}
                  inputProps={{
                    maxLength: 50,
                  }}
                  error={
                    formik.touched.email && formik.errors.email ? true : false
                  }
                  helperText={formik.touched.email && formik.errors.email}
                ></TextField>
                <FormLabel>Password</FormLabel>
                <TextField
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  required
                  variant="outlined"
                  type="password"
                  placeholder="Enter your password"
                  name="password"
                  sx={{ mb: 3 }}
                  fullWidth
                  value={formik.values.password}
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
                  {loading ? "...loading" : "Login"}
                </Button>
              </form>
              <small>
                Need an account? <Link to="/register">Register here</Link>
              </small>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};
export default Login;
