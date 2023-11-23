import "./styles.scss";
import { Triangle } from "./Triangle";
import { AppBar, Toolbar, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { PeopleAlt, Email } from "@mui/icons-material";
import { LinkButton } from "../";

const Header = () => {
  const { status, user } = useSelector((state) => state.auth);
  return (
    <AppBar className="header rounded-sm-0">
      <Toolbar className="px-3 px-sm-5 px-lg-3 px-xl-0">
        <Typography
          className="fw-bold"
          variant="h4"
          component="div"
          sx={{ flexGrow: 1 }}
        >
          devjobs
        </Typography>
        {status === "authenticated" ? (
          <div>
            <div className="d-flex">
              <PeopleAlt />
              <Typography className="ms-2" variant="p">
                {user.fullName}
              </Typography>
            </div>
            <hr />
            <div className="d-flex">
              <Email />
              <Typography className="ms-2" variant="p">
                {user.email}
              </Typography>
            </div>
          </div>
        ) : (
          <>
            <LinkButton label="Login" route="/login" />
            <span>|</span>
            <LinkButton label="Signup" route="/signup" />
          </>
        )}
      </Toolbar>
      <Triangle />
    </AppBar>
  );
};

export default Header;
