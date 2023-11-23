import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./styles.scss";
import { Triangle } from "./Triangle";
import { AppBar, Toolbar, Typography, Switch } from "@mui/material";
import { PeopleAlt, Email, Nightlight, Brightness7 } from "@mui/icons-material";
import { LinkButton } from "../";
import { setDarkMode } from "../../redux/darkMode";

const Header = () => {
  const { status, user } = useSelector((state) => state.auth);
  const { DARK } = useSelector((state) => state.darkMode);
  const [theme, setTheme] = useState(!!DARK);
  const dispatch = useDispatch();

  const onChangeTheme = (event) => {
    setTheme(event.target.checked);
    dispatch(setDarkMode(theme ? 0 : 1));
  };

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
        <div>
          {status === "authenticated" ? (
            <>
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
            </>
          ) : (
            <>
              <LinkButton label="Login" route="/login" />
              <span>|</span>
              <LinkButton label="Signup" route="/signup" />
              <hr />
            </>
          )}
          <div className="d-flex align-items-center justify-content-center">
            <Brightness7 />
            <Switch checked={theme} color="default" onChange={onChangeTheme} />
            <Nightlight />
          </div>
        </div>
      </Toolbar>
      <Triangle />
    </AppBar>
  );
};

export default Header;
