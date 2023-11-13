import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../redux/userSlice";
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

const Login = () => {
  //States
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false);
  const [toggleErrorMessage, setToggleErrorMessage] = useState(true);

  //Redux states
  const { loading, error } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  // eslint-disable-next-line no-unused-vars
  const [searchParams, setSearchParams] = useSearchParams();

  const handleLogin = (e) => {
    e.preventDefault();

    setToggleErrorMessage(true);

    let userCredentials = {
      email,
      password,
    };

    dispatch(loginUser(userCredentials)).then((result) => {
      if (result.payload) {
        setEmail("");
        setPassword("");
        navigate("/");
      }
    });
  };

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
                onClick={() => {setToggleErrorMessage(false)}}
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
              <form autoComplete="off" onSubmit={handleLogin}>
                <FormLabel>Email</FormLabel>
                <TextField
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  variant="outlined"
                  type="email"
                  placeholder="Enter your email"
                  sx={{ mb: 3 }}
                  fullWidth
                  value={email}
                  inputProps={{
                    maxLength: 50,
                  }}
                ></TextField>
                <FormLabel>Password</FormLabel>
                <TextField
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  variant="outlined"
                  type="password"
                  placeholder="Enter your password"
                  sx={{ mb: 3 }}
                  fullWidth
                  value={password}
                  inputProps={{
                    maxLength: 60,
                  }}
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
