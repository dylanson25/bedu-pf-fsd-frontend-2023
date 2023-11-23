import { Fragment } from "react";
import { Header } from "../components";

const DefaultLayout = ({ children }) => {
  return (
    <>
      <Header />
      <div className="main">
        <Fragment>{children}</Fragment>
      </div>
    </>
  );
};

export default DefaultLayout;
