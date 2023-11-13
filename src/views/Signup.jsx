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

const Signup = () => {
  //States
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const limitChar = 10;
  let timeout;

  const handleNumericChange = (e) => {
    if (e.target.value.toString().length <= limitChar) {
      setPhoneNumber(e.target.value);
    }
  };

  const navigate = useNavigate();

  const registerAPIRequest = async (user) => {
    try {
      const request = await Api.post(`${process.env.API_END_POINT}user`, user);
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

  const handleSignup = async (e) => {
    e.preventDefault();

    //Form validation

    const userData = {
      firstName,
      lastName,
      email,
      phoneNumber,
      password,
    };

    //Make request to backend
    const status = await registerAPIRequest(userData);

    // If it returns a user (something not null) then redirect
    if (status) {
      navigate("/login?registration=true");
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
              <form onSubmit={handleSignup}>
                <Grid
                  container
                  direction={"row"}
                  spacing={2}
                  sx={{ marginBottom: 4 }}
                >
                  <Grid item xs={12} sm={6}>
                    <Grid item xs={12}>
                      <FormLabel>First Name</FormLabel>
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        type="text"
                        variant="outlined"
                        color="secondary"
                        placeholder="First Name"
                        onChange={(e) => setFirstName(e.target.value)}
                        value={firstName}
                        fullWidth
                        required
                        inputProps={{
                          maxLength: 30,
                        }}
                      />
                    </Grid>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Grid item xs={12}>
                      <FormLabel>Last Name</FormLabel>
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        type="text"
                        variant="outlined"
                        color="secondary"
                        placeholder="Last Name"
                        onChange={(e) => setLastName(e.target.value)}
                        value={lastName}
                        fullWidth
                        required
                        inputProps={{
                          maxLength: 30,
                        }}
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <FormLabel>Email</FormLabel>
                <TextField
                  type="email"
                  variant="outlined"
                  color="secondary"
                  placeholder="Email"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  fullWidth
                  required
                  sx={{ mb: 4 }}
                  inputProps={{
                    maxLength: 50,
                  }}
                ></TextField>
                <FormLabel>Phone number</FormLabel>
                <TextField
                  type="number"
                  variant="outlined"
                  color="secondary"
                  placeholder="Phone number"
                  onChange={(e) => handleNumericChange(e)}
                  value={phoneNumber}
                  fullWidth
                  required
                  sx={{ mb: 4 }}
                />
                <FormLabel>Password</FormLabel>
                <TextField
                  type="password"
                  variant="outlined"
                  color="secondary"
                  placeholder="Enter your password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  fullWidth
                  required
                  sx={{ mb: 4 }}
                  inputProps={{
                    maxLength: 60,
                  }}
                ></TextField>
                <Button variant="outlined" color="secondary" type="submit">
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
