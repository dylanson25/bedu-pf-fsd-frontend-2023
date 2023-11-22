import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home, Login } from "./views";
import Signup from "./views/Signup";
import Error404 from "./views/Error404";
import ProtectedRoute from "./utils/protectedRoute";
import Authorized from "./views/Authorized";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/authorized" element={<ProtectedRoute authenticated={localStorage.getItem('user')} redirectPath="/">
            <Authorized/>
          </ProtectedRoute>} />
        <Route path="*" element={<Error404/>}/>
      </Routes>
    </Router>
  );
}

export default App;
