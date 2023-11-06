import "./assets/styles/App.css";
import Api from "./utils/Api";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home, Login } from "./views";

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
  );
}

export default App;
