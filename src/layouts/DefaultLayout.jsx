import { Fragment } from "react";
import { Container } from "@mui/material";
import { Header } from "../components";

const DefaultLayout = ({ children }) => {
  return (
    <>
      <Header />
      <Container maxWidth="lg" className="main">
        <Fragment>{children}</Fragment>
      </Container>
    </>
  );
};

export default DefaultLayout;
