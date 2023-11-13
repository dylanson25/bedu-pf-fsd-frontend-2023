import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home, Login } from "./views";
import Signup from "./views/Signup";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Signup />} />
      </Routes>
    </Router>
  );
}

export default App;
