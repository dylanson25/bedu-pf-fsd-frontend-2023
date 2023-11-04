import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material";
import theme from "./utils/theme/ThemeConfig";

import "./assets/styles/App.css";
import Api from "./utils/Api";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./components/Home";
import { Login } from "./components/Login";

function App() {
  const getUsers = async () => {
    try {
      const { data } = await Api.get("user");
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  getUsers();
  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </>
    // import CssBaseline from "@mui/material/CssBaseline";
    // import { ThemeProvider } from "@mui/material";
    // import theme from "./utils/ThemeConfig.js";

    // import "./assets/styles/App.css";

    // function App() {
    //   return (
    //     <ThemeProvider theme={theme("light")}>
    //       <CssBaseline />
    //       <h1>WEBDEVJOBS</h1>
    //       <hr />
    //       Hola mundo
    //     </ThemeProvider>
  );
}

export default App;
