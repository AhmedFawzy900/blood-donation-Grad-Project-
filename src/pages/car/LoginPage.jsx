import { useEffect, useState } from "react";
// import { Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { Alert, TextField } from "@mui/material";
import logo from "../../images/logo.png";
export default function LoginPage() {
  const navigate = useNavigate();
  const [errorMsg, setError] = useState("");
  const [users, setUsers] = useState([]);
  const [hospitals, setHospitals] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  useEffect(() => {
    getAllUsers();
  }, []);

  const getAllUsers = () => {
    // get the normal users
    fetch("http://localhost:8000/api/car/get-admins-info")
      .then((res) => res.json())
      .then((data) => setUsers(data));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(hospitals, users);
    const userMatch = users.find(
      (user) => user.email === email && user.password === password
    );
    if (userMatch) {
      setError("");
      localStorage.setItem(
        "Admin",
        JSON.stringify(userMatch)
      );
      navigate("/car/dashboard/");
      console.log(userMatch);
    } else {
      setError("The email or password is incorrect.");
    }
  };
  return (
    <div className="car-login">
      <div class="box">
        <a href="#" className="logo">MediTour</a>
        <section class="form">
          <form onSubmit={handleSubmit}>
            <div className="w-100 mb-3">{errorMsg && <Alert severity="error">{errorMsg}</Alert>}</div>
            <TextField
              id="standard-basic"
              onChange={(e) => setEmail(e.target.value)}
              label="Email Address"
              variant="standard"
              required
              className="mb-4 w-100"
            />
            <TextField
                id="standard-basic"
                onChange={(e) => setPassword(e.target.value)}
                label="Password"
                variant="standard"
                type="password"
                required
                className="mb-4 w-100"
                />
            <div class="field button text-center">
              <input type="submit" className="btn" value="login" />
            </div>
          </form>
        </section>
        <p className="text-center my-2">You are not Admin? return to <a href="/car/home" className="link">Home</a> page</p>
      </div>
    </div>
  );
}
