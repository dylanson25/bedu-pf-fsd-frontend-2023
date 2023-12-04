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
  FormControlLabel,
  Checkbox,
  InputLabel,
  Select,
  MenuItem,
  FormControl,
  Box,
  FormHelperText,
  IconButton,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import Api from "../utils/Api";
import CloseIcon from "@mui/icons-material/Close";
import { useFormik } from "formik";
import * as Yup from "yup"; //Validation library
import { getItem } from "../utils/localStorage";

const PostForm = () => {
  //States
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const formik = useFormik({
    initialValues: {
      positionName: "",
      positionRoll: "",
      companyName: "",
      positionTypeId: 1,
      description: "",
      requirements: "",
      responsibilities: "",
      location: "",
      isActive: false,
    },
    validationSchema: Yup.object({
      positionName: Yup.string()
        .min(5, "Must be at least 5 characters long")
        .max(50, "Must be 50 characters or less")
        .required("Position name is a required field"),
      positionRoll: Yup.string()
        .min(5, "Must be at least 5 characters long")
        .max(50, "Must be 50 characters or less")
        .required("Position roll is a required field"),
      companyName: Yup.string()
        .min(5, "Must be at least 5 characters long")
        .max(30, "Must be 30 characters or less")
        .required("Company name is a required field"),
      positionTypeId: Yup.number().required(
        "Position type is a required field"
      ),
      description: Yup.string()
        .min(5, "Must be at least 5 characters long")
        .max(2500, "Must be 2500 characters or less")
        .required("Description is a required field"),
      requirements: Yup.string()
        .min(5, "Must be at least 5 characters long")
        .max(2500, "Must be 2500 characters or less")
        .required("Requirements is a required field"),
      responsibilities: Yup.string()
        .min(5, "Must be at least 5 characters long")
        .max(2500, "Must be 2500 characters or less")
        .required("Responsibilities is a required field"),
      location: Yup.string()
        .min(2, "Must be at least 2 characters long")
        .max(150, "Must be 150 characters or less")
        .required("Location is a required field"),
      isActive: Yup.boolean().required(
        "Must specify if job post is active or no"
      ),
    }),
    onSubmit: async (values) => {
      //Prevent default and for validation happens by default

      const postData = {
        ...values,
        employerId: parseInt(getItem("AH").id)
      };

      //Make request to backend
      const status = await registerAPIRequest(postData);

      // If it returns a post (something not null) then redirect
      if (status) {
        navigate("/");
      }
    },
  });

  let timeout;

  const navigate = useNavigate();

  const registerAPIRequest = async (data) => {
    try {
      const request = await Api.post(
        `post`,
        {
          ...data,
        },
        { headers: { Authorization: `Bearer ${getItem("AH").Authorization}` } }
      );
      const response = await request.data;
      return response;
    } catch (e) {
      if (e.data.status === "ERR_VALIDATION") {
        setErrorMessage(
          "The information presented is incorrect, please modify and try again"
        );
      } else {
        setErrorMessage(
          "This post already exists in the system. Please change the data and try again"
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
            <CardHeader title="Post Form" />
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
                      <FormLabel>Position Name*</FormLabel>
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        type="text"
                        variant="outlined"
                        color="secondary"
                        placeholder="Position Name"
                        name="positionName"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.positionName}
                        fullWidth
                        required
                        inputProps={{
                          maxLength: 50,
                        }}
                        error={
                          formik.touched.positionName &&
                          formik.errors.positionName
                            ? true
                            : false
                        }
                        helperText={
                          formik.touched.positionName &&
                          formik.errors.positionName
                        }
                      />
                    </Grid>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Grid item xs={12}>
                      <FormLabel>Position Roll*</FormLabel>
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        type="text"
                        variant="outlined"
                        color="secondary"
                        placeholder="Position Roll"
                        name="positionRoll"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.positionRoll}
                        fullWidth
                        required
                        inputProps={{
                          maxLength: 30,
                        }}
                        error={
                          formik.touched.positionRoll &&
                          formik.errors.positionRoll
                            ? true
                            : false
                        }
                        helperText={
                          formik.touched.positionRoll &&
                          formik.errors.positionRoll
                        }
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid container direction={"row"} spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Grid item xs={12}>
                      <FormLabel>Company Name*</FormLabel>
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        type="text"
                        variant="outlined"
                        color="secondary"
                        placeholder="Company Name"
                        name="companyName"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.companyName}
                        fullWidth
                        required
                        sx={{ mb: 4 }}
                        inputProps={{
                          maxLength: 30,
                        }}
                        error={
                          formik.touched.companyName &&
                          formik.errors.companyName
                            ? true
                            : false
                        }
                        helperText={
                          formik.touched.companyName &&
                          formik.errors.companyName
                        }
                      ></TextField>
                    </Grid>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Grid item xs={12}>
                      <FormLabel>Location*</FormLabel>
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        type="text"
                        variant="outlined"
                        color="secondary"
                        placeholder="Location"
                        name="location"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.location}
                        fullWidth
                        required
                        sx={{ mb: 4 }}
                        inputProps={{
                          maxLength: 150,
                        }}
                        error={
                          formik.touched.location && formik.errors.location
                            ? true
                            : false
                        }
                        helperText={
                          formik.touched.location && formik.errors.location
                        }
                      ></TextField>
                    </Grid>
                  </Grid>
                </Grid>
                <FormControl
                  fullWidth
                  required
                  error={
                    formik.touched.positionTypeId &&
                    formik.errors.positionTypeId
                      ? true
                      : false
                  }
                  sx={{ mb: 4 }}
                >
                  <InputLabel id="position-type-label">
                    Position Type
                  </InputLabel>
                  <Select
                    labelId="position-type-label"
                    id="position-type"
                    name="positionTypeId"
                    value={formik.values.positionTypeId}
                    label="Position Type"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  >
                    <MenuItem value={1}>Tiempo completo</MenuItem>
                    <MenuItem value={2}>Medio tiempo</MenuItem>
                    <MenuItem value={3}>Prácticas</MenuItem>
                    <MenuItem value={4}>Servicio Social</MenuItem>
                  </Select>
                  <FormHelperText>
                    {formik.touched.positionTypeId &&
                      formik.errors.positionTypeId}
                  </FormHelperText>
                </FormControl>
                <FormLabel>Description*</FormLabel>
                <TextField
                  type="text"
                  variant="outlined"
                  color="secondary"
                  placeholder="Description"
                  name="description"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.description}
                  fullWidth
                  multiline
                  rows={3}
                  required
                  sx={{ mb: 4 }}
                  inputProps={{
                    maxLength: 2500,
                  }}
                  error={
                    formik.touched.description && formik.errors.description
                      ? true
                      : false
                  }
                  helperText={
                    formik.touched.description && formik.errors.description
                  }
                ></TextField>
                <FormLabel>Requirements*</FormLabel>
                <TextField
                  type="text"
                  variant="outlined"
                  color="secondary"
                  placeholder="Requirements"
                  name="requirements"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.requirements}
                  fullWidth
                  multiline
                  rows={3}
                  required
                  sx={{ mb: 4 }}
                  inputProps={{
                    maxLength: 2500,
                  }}
                  error={
                    formik.touched.requirements && formik.errors.requirements
                      ? true
                      : false
                  }
                  helperText={
                    formik.touched.requirements && formik.errors.requirements
                  }
                ></TextField>
                <FormLabel>Responsibilities*</FormLabel>
                <TextField
                  type="text"
                  variant="outlined"
                  color="secondary"
                  placeholder="Responsibilities"
                  name="responsibilities"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.responsibilities}
                  fullWidth
                  multiline
                  rows={3}
                  required
                  sx={{ mb: 4 }}
                  inputProps={{
                    maxLength: 2500,
                  }}
                  error={
                    formik.touched.responsibilities &&
                    formik.errors.responsibilities
                      ? true
                      : false
                  }
                  helperText={
                    formik.touched.responsibilities &&
                    formik.errors.responsibilities
                  }
                ></TextField>
                <Box sx={{ display: "flex" }}>
                  <FormControl
                    required
                    error={
                      formik.touched.isActive && formik.errors.isActive
                        ? true
                        : false
                    }
                    component="fieldset"
                    sx={{ mb: 4 }}
                    variant="standard"
                  >
                    <FormControlLabel
                      control={
                        <Checkbox
                          name="isActive"
                          checked={formik.values.isActive}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          inputProps={{ "aria-label": "controlled" }}
                        />
                      }
                      label="Active"
                    />
                    <FormHelperText>
                      {formik.touched.isActive && formik.errors.isActive}
                    </FormHelperText>
                  </FormControl>
                </Box>
                <Button variant="outlined" type="submit">
                  Publish
                </Button>
              </form>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default PostForm;
