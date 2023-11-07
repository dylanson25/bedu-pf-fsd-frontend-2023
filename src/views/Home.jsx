import { DefaultLayout } from "../layouts";
import { useState } from "react";
import { Link } from "react-router-dom";

function getUser() {
  let user = localStorage.getItem("user");
  if (user) {
    user = JSON.parse(user);
  } else {
    user = null;
  }
  return user;
}

const Home = () => {
  const [user, setUser] = useState(getUser());

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <DefaultLayout>
      <div className="home-view">
        {user ? (
          <>
            <h4>Hola pendiente</h4>
            <h5>Tu token es {user}</h5>
            <button onClick={handleLogout}>LOGOUT</button>
          </>
        ) : (
          <Link to="/login">LOGIN</Link>
        )}
      </div>
    </DefaultLayout>
  );
};
export default Home;
