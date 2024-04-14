import { useEffect, useState } from "react";
// import { Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { Alert, TextField } from "@mui/material";
import logo from "../images/logo.png";
export default function Login() {
  const navigate = useNavigate();
  const [errorMsg, setError] = useState("");
  const [users, setUsers] = useState([]);
  const [hospitals, setHospitals] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  useEffect(() => {
    getAllUsers();
    getAllHospitals();
  }, []);

  const getAllUsers = () => {
    // get the normal users
    fetch("http://localhost:8000/api/get-users-personal-info")
      .then((res) => res.json())
      .then((data) => setUsers(data));
  };

  const getAllHospitals = () => {
    // get the normal users
    fetch("http://localhost:8000/api/get-hospitals-personal-info")
      .then((res) => res.json())
      .then((data) => setHospitals(data));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(hospitals, users);
    const userMatch = users.find(
      (user) => user.email === email && user.password === password
    );
    const hospitalMatch = hospitals.find(
      (user) => user.email === email && user.password === password
    );
    if (userMatch || hospitalMatch) {
      setError("");
      localStorage.setItem(
        "currentUser",
        JSON.stringify(userMatch ? userMatch : hospitalMatch)
      );
      navigate("/home");
      console.log(userMatch ? userMatch : hospitalMatch);
    } else {
      setError("The email or password is incorrect.");
    }
  };
  return (
    <div className="body choosePath">
      <div class="wrapper login userRegister content">
        <img className="logo" src={logo} alt="logo" />
        <section class="form ">
          {/* <header>Sign in</header> */}
          <form onSubmit={handleSubmit}>
            <div>{errorMsg && <Alert severity="error">{errorMsg}</Alert>}</div>
            <TextField
              id="standard-basic"
              onChange={(e) => setEmail(e.target.value)}
              label="Email Address"
              variant="standard"
              required
            />

            {/* <div class="field input">
              <label>Email Address</label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="text"
                placeholder="Enter your email"
              />
            </div> */}
            <TextField
                id="standard-basic"
                onChange={(e) => setPassword(e.target.value)}
                label="Password"
                variant="standard"
                type="password"
                required
                />
            {/* <div class="field input">
              <label>Password</label>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="Enter your password"
              />
              <i class="fa-solid fa-eye"></i>
            </div> */}
            <div class="field button text-center">
              <input type="submit" className="login-btn next-btn" value="login" />
            </div>

            <div class="link">
              Not yet signed up? <Link to={"/"}>Signup now</Link>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
}
