// Aqui iran elementos que compartan varias pantallas como \
// el header etc..
import { Fragment } from "react";
import { Typography, Container } from "@mui/material";

const DefaultLayout = ({ children }) => {
  return (
    <>
      {/* Sacar a componente */}
      <header>
        <Typography variant="h5">WEBDEVJOBS</Typography>
      </header>
      <Container maxWidth="lg" className="main">
        <Fragment>{children}</Fragment>
      </Container>
    </>
  );
};

export default DefaultLayout;
