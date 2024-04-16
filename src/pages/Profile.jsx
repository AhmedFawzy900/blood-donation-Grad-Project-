import { useState } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import * as React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import PublishedWithChangesIcon from "@mui/icons-material/PublishedWithChanges";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import {
  Alert,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  MenuItem,
} from "@mui/material";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { AlertHeading, Col, Row } from "react-bootstrap";
import { Slide, ToastContainer, Zoom, toast } from "react-toastify";
export default function Profile() {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const oldEmail = currentUser.email;
  const [user, setUser] = useState({
    name: currentUser.name,
    national_Id: currentUser.national_Id,
    email: currentUser.email,
    password: currentUser.password,
    age: currentUser.age,
    phone_number: currentUser.phone_number,
    gender: currentUser.gender,
  });
  const [hospital, setHospital] = useState({
    name: currentUser.name,
    email: currentUser.email,
    password:currentUser.password,
    phone_number: currentUser.phone_number,
    zip:currentUser.zip,
    city: currentUser.city,
    type:currentUser.type ,
  });
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const [hospitals, setHospitals] = useState([]);
  const navigate = useNavigate();
  React.useEffect(() => {
    getAllUsers();
    getAllHospitals();
  }, []);
  const getAllUsers = () => {
    fetch("http://localhost:8000/api/get-users-personal-info")
      .then((res) => res.json())
      .then((data) => setUsers(data));
  };
  const getAllHospitals = () => {
    fetch("http://localhost:8000/api/get-hospitals-personal-info")
    .then((res) => res.json())
    .then((data) => setHospitals(data));
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    // log the user
    console.log(user);
    console.log(hospital);
    if (currentUser.type === "user") {
      if (user.email !== oldEmail) {
        if (users.some((e) => e.email === user.email)) {
          setError("email already exists");
        } else {
          setError("");
          // Additional logic for email change if needed
          if (user.national_Id.length !== 14) {
            setError("National ID should be 14 digits");
          } else if (user.phone_number.length !== 11) {
            setError("Phone number should be 11 digits");
          } else {
            setError("");
            fetch("http://localhost:8000/api/update-user-info/1", {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(user),
            }).then(async (response) => {
              const data = await response.json(); // Wait for the JSON data
              localStorage.setItem("currentUser", JSON.stringify(data));
              toast.success(`Profile Updated Successfully`, {
                position: "top-right",
                autoClose: 2500,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Slide,
              });
            });
          }
        }
      } else {
        if (user.national_Id.length !== 14) {
          setError("National ID should be 14 digits");
        } else if (user.phone_number.length !== 11) {
          setError("Phone number should be 11 digits");
        } else {
          setError("");
          fetch("http://localhost:8000/api/update-user-info/1", {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
          }).then(async (response) => {
            const data = await response.json(); // Wait for the JSON data
            localStorage.setItem("currentUser", JSON.stringify(data));
            toast.success(`Profile Updated Successfully`, {
              position: "top-right",
              autoClose: 2500,
              hideProgressBar: false,
              closeOnClick: false,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
              transition: Slide,
            });
          });
        }
      }
    } else {
      console.log("hospital case");
    if (hospital.email !== oldEmail) {
        if (hospitals.some((e) => e.email === hospital.email)) {
          setError("email already exists");
        } else if(hospital.phone_number.length !== 11){
          setError("Phone number should be 11 digits");
        } else {
          setError("");
          fetch(`http://localhost:8000/api/update-hospital-info/${currentUser.id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(hospital),
          }).then(async (response) => {
            const data = await response.json(); // Wait for the JSON data
            localStorage.setItem("currentUser", JSON.stringify(data));
            toast.success(`Profile Updated Successfully`, {
              position: "top-right",
              autoClose: 2500,
              hideProgressBar: false,
              closeOnClick: false,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
              transition: Slide,
            });
          });
        }
    }else{
      if(hospital.phone_number.length !== 11){
        setError("Phone number should be 11 digits");
      } else {
        setError("");
        fetch(`http://localhost:8000/api/update-hospital-info/${currentUser.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(hospital),
        }).then(async (response) => {
          const data = await response.json(); // Wait for the JSON data
          localStorage.setItem("currentUser", JSON.stringify(data));
          toast.success(`Profile Updated Successfully`, {
            position: "top-right",
            autoClose: 2500,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Slide,
          });
        });
      }

    }
  }
  };
  return (
    <>
      <Navbar />
      <div className="body profile_page choosePath">
        <div class="wrapper profile userRegister">
          <section class="form signup">
            <header>Your Profile</header>
            <ToastContainer
              position="top-right"
              autoClose={2200}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
            />
            <form onSubmit={handleSubmit}>
              <div>{error && <Alert severity="error">{error}</Alert>}</div>
              {currentUser.type === "user" ? (
                <>
                  <Row>
                    <Col>
                      <TextField
                        id="standard-basic"
                        value={user.name}
                        onChange={(e) =>
                          setUser({ ...user, name: e.target.value })
                        }
                        label="Full Name"
                        variant="standard"
                        required
                      />
                    </Col>
                    <Col>
                      <TextField
                        id="standard-basic"
                        value={user.email}
                        onChange={(e) =>
                          setUser({ ...user, email: e.target.value })
                        }
                        label="Email Address"
                        variant="standard"
                        required
                      />
                    </Col>
                  </Row>

                  <TextField
                    id="standard-basic"
                    value={user.national_Id}
                    onChange={(e) =>
                      setUser({ ...user, national_Id: e.target.value })
                    }
                    label="National ID"
                    variant="standard"
                    required
                  />

                  <TextField
                    id="standard-basic"
                    value={user.phone_number}
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
                        value={user.password}
                        onChange={(e) =>
                          setUser({ ...user, password: e.target.value })
                        }
                        label="Password"
                        variant="standard"
                        type="password"
                        required
                      />
                    </Col>
                    <Col>
                      <TextField
                        id="standard-basic"
                        value={user.age}
                        onChange={(e) =>
                          setUser({ ...user, age: e.target.value })
                        }
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
                    value={user.gender}
                  >
                    <MenuItem key={"male"} value={"male"}>
                      Male
                    </MenuItem>
                    <MenuItem key={"female"} value={"female"}>
                      Female
                    </MenuItem>
                  </TextField>
                </>
              ) : (
                <>
                  <Row>
                    <TextField
                      className="mb-3"
                      id="outlined-basic"
                      label="Hospital Name"
                      variant="outlined"
                      value={hospital.name}
                      onChange={(e) =>
                        setHospital({ ...hospital, name: e.target.value })
                      }
                      required
                    />
                  </Row>

                  <Row className="d-flex justify-content-between gap-2">
                    <TextField
                      className="col-md-6 mb-3"
                      id="outlined-basic"
                      label="Email"
                      variant="outlined"
                      value={hospital.email}
                      onChange={(e) =>
                        setHospital({ ...hospital, email: e.target.value })
                      }
                      required
                    />
                    <TextField
                      className="col-md-5 mb-3"
                      id="outlined-password-input"
                      label="Password"
                      type="password"
                      autoComplete="current-password"
                      variant="outlined"
                      value={hospital.password}
                      onChange={(e) =>
                        setHospital({ ...hospital, password: e.target.value })
                      }
                      required
                    />
                  </Row>

                  <Row>
                    <TextField
                      className="mb-3"
                      id="outlined-basic"
                      label="Phone Number"
                      variant="outlined"
                      value={hospital.phone_number}
                      onChange={(e) =>
                        setHospital({
                          ...hospital,
                          phone_number: e.target.value,
                        })
                      }
                      required
                    />
                  </Row>
                  <Row className="d-flex justify-content-between gap-1">
                    <TextField
                      className="col-md-6 mb-3"
                      id="outlined-basic"
                      label="City"
                      variant="outlined"
                      value={hospital.city}
                      onChange={(e) =>
                        setHospital({ ...hospital, city: e.target.value })
                      }
                      required
                    />
                    <TextField
                      className="col-md-5 mb-3"
                      id="outlined-basic"
                      label="Zip Code"
                      variant="outlined"
                      value={hospital.zip}
                      onChange={(e) =>
                        setHospital({ ...hospital, zip: e.target.value })
                      }
                      required
                    />
                  </Row>

                  <Row>
                    <TextField
                      className="mb-3"
                      id="outlined-select-currency"
                      select
                      label="Type"
                      helperText="Please select your Type Hospital Or Bank"
                      onChange={(e) => {
                        if (e.target.value != "") {
                          setHospital({ ...hospital, type: e.target.value });
                        }
                      }}
                      value={hospital.type}
                      required
                    >
                      <MenuItem key={"hospital"} value={"hospital"}>
                        Hospital
                      </MenuItem>
                      <MenuItem key={"blood_bank"} value={"blood_bank"}>
                        Blood Bank
                      </MenuItem>
                    </TextField>
                  </Row>
                </>
              )}

              <div class="field button d-flex justify-content-between align-items-center">
                <button type="submit" className="next-btn">
                  Save Changes <PublishedWithChangesIcon />
                </button>
                <div className="medical_info-btn" onClick={()=>{navigate('/updateMedicalInfo')}}>
                  Medical Info <ArrowForwardIcon />
                </div>
              </div>
            </form>
          </section>
        </div>
      </div>
    </>
  );
}

