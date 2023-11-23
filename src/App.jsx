import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home, Login, Signup } from "./views";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { checkAUTH } from "./redux/auth";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(checkAUTH());
  }, []);

  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
