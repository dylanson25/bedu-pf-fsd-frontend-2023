import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  //States
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //Redux states
  const { loading, error } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    let userCredentials = {
      email,
      password,
    };

    dispatch(loginUser(userCredentials)).then((result) => {
      if (result.payload) {
        setEmail("");
        setPassword("");
        navigate("/");
      }
    });
  };

  return (
    <>
      <form style={{ width: "100%", maxWidth: "400px" }} onSubmit={handleLogin}>
        <label>Email</label>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        ></input>
        <br />
        <label>Password</label>
        <input
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        <br />
        <button type="submit">{loading ? "...loading" : "LOGIN"}</button>
        {error && (<div style={{ backgroundColor: "red" }}>{error}</div>)}
      </form>
    </>
  );
};
