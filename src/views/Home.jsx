import { DefaultLayout } from "../layouts";
// import { useState } from "react";
// import { Link } from "react-router-dom";
// import { useSelector } from "react-redux";

const Home = () => {
  // const { status } = useSelector((state) => state.auth);

  return (
    <DefaultLayout>
      <div className="home-view">
        {/* {user ? (
            <>
              <h4>{status}</h4>
              <h4>Hola {user.fullName}</h4>
              <h4>con email {user.email}</h4>
              <h5>Tu token es {user.jwt}</h5>
              <button onClick={handleLogout}>LOGOUT</button>
            </>
          ) : (
            <Link to="/login">LOGIN</Link>
          )} */}
      </div>
    </DefaultLayout>
  );
};
export default Home;
