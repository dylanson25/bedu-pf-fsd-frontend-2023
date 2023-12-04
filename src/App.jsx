import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home, Login, Signup } from "./views";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { checkAUTH } from "./redux/auth";
import "./assets/styles/index.scss";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider, StyledEngineProvider } from "@mui/material";
import theme from "./utils/theme/ThemeConfig";
import PostForm from "./views/PostForm";

function App() {
  const { DARK } = useSelector((state) => state.darkMode);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(checkAUTH());
  }, []);

  return (
    <ThemeProvider theme={theme(DARK ? "dark" : "light")}>
      <StyledEngineProvider injectFirst>
        <CssBaseline />
        <Router>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/jobPost" element={<PostForm />} /> {/* This should be a protected route */}
          </Routes>
        </Router>
      </StyledEngineProvider>
    </ThemeProvider>
  );
}

export default App;
