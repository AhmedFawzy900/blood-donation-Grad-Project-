import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import * as React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import {
  Alert,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  MenuItem,
} from "@mui/material";
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { AlertHeading, Col, Row } from "react-bootstrap";
export default function Register() {
  const navigate = useNavigate();
  const [errorMsg, setError] = useState("");
  const [users, setUsers] = useState([]);
  // calc the date
  const currentDate = new Date();
  const day = currentDate.getDate();
  const month = currentDate.getMonth() + 1; // Months are zero-indexed, so we add 1
  const year = currentDate.getFullYear();

  const formattedDate = `${year} - ${month < 10 ? `0${month}` : month} -${
    day < 10 ? `0${day}` : day
  }  `;

  useEffect(() => {
    getAllUsers();
  }, []);
  const getAllUsers = () => {
    fetch("http://localhost:8000/api/get-users-personal-info")
      .then((res) => res.json())
      .then((data) => setUsers(data));
  };
  const [user, setUser] = useState({
    name: "",
    national_Id: "",
    email: "",
    password: "",
    age: "",
    phone_number: "",
    gender: "",
    type: "user",
    date: formattedDate,
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    // log the user
    console.log(user);

    //  check if user exists
    const userExists = users.some((e) => e.email === user.email);
    if (userExists) {
      setError("email already exists!");
    } else {
      setError("");
    }
    if (!userExists) {
      if (user.national_Id.length !== 14) {
        setError("National ID should be 14 digits");
      } else {
        setError("");
        if (user.phone_number.length !== 11) {
          setError("Phone number should be 11 digits");
        } else {
          setError("");
          // now after we validate we can add user
          fetch("http://localhost:8000/api/save-user-personal-info", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
          }).then(async (response) => {
            const data = await response.json(); // Wait for the JSON data
            localStorage.setItem("currentUser", JSON.stringify(data));
            setUser({
              name: "",
              national_Id: "",
              email: "",
              password: "",
              age: "",
              phone_number: "",
              gender: "",
              type: "user",
              date: "",
            });
          
            navigate("/user/medicalInfo");
          });
        }
      }
    }
  };
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <div className="body choosePath">
      <div class="wrapper content userRegister">
        <section class="form signup">
          <header>Create An Account</header>
          <form onSubmit={handleSubmit}>
            <div>{errorMsg && <Alert severity="error">{errorMsg}</Alert>}</div>
            <Row>
              <Col>
                <TextField
                  id="standard-basic"
                  onChange={(e) => setUser({ ...user, name: e.target.value })}
                  label="Full Name"
                  variant="standard"
                  required
                />
              </Col>
              <Col>
                <TextField
                  id="standard-basic"
                  onChange={(e) => setUser({ ...user, email: e.target.value })}
                  label="Email Address"
                  variant="standard"
                  required
                />
              </Col>
            </Row>

            <TextField
              id="standard-basic"
              onChange={(e) =>
                setUser({ ...user, national_Id: e.target.value })
              }
              label="National ID"
              variant="standard"
              required
            />

            <TextField
              id="standard-basic"
              onChange={(e) =>
                setUser({ ...user, phone_number: e.target.value })
              }
              label="Phone Number"
              variant="standard"
              required
            />
            <Row>
              <Col>
                <TextField
                id="standard-basic"
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                label="Password"
                variant="standard"
                type="password"
                required
                />
              </Col>
              <Col>
                <TextField
                id="standard-basic"
                onChange={(e) => setUser({ ...user, age: e.target.value })}
                label="Your Age"
                variant="standard"
                required
                />
              </Col>
            </Row>

            <TextField
              className="my-3"
              id="outlined-select-currency"
              select
              label="Select"
              helperText="Please select your Gender"
              onChange={(e) => {
                if (e.target.value != "") {
                  setUser({ ...user, gender: e.target.value });
                }
              }}
              required
            >
              <MenuItem key={"male"} value={"male"}>
                Male
              </MenuItem>
              <MenuItem key={"female"} value={"female"}>
                Female
              </MenuItem>
            </TextField>

            <div class="field button">
              <button type="submit" className="next-btn">
                Next
                <ArrowRightIcon />
              </button>
            </div>

            <div class="link text-center">
              <Link to={"/login"}>login now</Link>{" "}
              Or Register as
              <Link to={"/hospital/hosRegister"}>Hospital or Bank</Link>?
            </div>
          </form>
        </section>
      </div>
    </div>
  );
}
