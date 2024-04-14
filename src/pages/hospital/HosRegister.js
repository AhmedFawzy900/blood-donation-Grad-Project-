import { InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { Alert, FormControl, Row } from "react-bootstrap";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import ArrowRightIcon from '@mui/icons-material/ArrowRight';

export default function HosRegister() {
  const navigate = useNavigate();
  const [errorMsg, setError] = useState("");
  const [hospitals, setHospitals] = useState([]);

  useEffect(() => {
    getAllHospitals();
  },[]);
  const getAllHospitals = () => {
    fetch("http://localhost:8000/api/get-hospitals-personal-info")
      .then((res) => res.json())
      .then((data) => setHospitals(data));
  };
  const [hospital, setHospital] = useState({
    name: "",
    email: "",
    password: "",
    phone_number: "",
    zip: "",
    city: "",
    type: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    // log the info in hospital
    console.log(hospital);

    //  check if user exists
    const emilExists = hospitals.some((e) => e.email === hospital.email);
    if (!emilExists) {
      setError("");
      if (hospital.phone_number.length == 11) {
        setError("");
        // now after we validate we can add user
        fetch("http://localhost:8000/api/save-hospital-personal-info", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(hospital),
        }).then(async (response) => {
          const data = await response.json(); // Wait for the JSON data
          localStorage.setItem("currentUser", JSON.stringify(data));
          setHospital({
            name: "",
            email: "",
            password: "",
            phone_number: "",
            zip: "",
            city: "",
            type: "",
          });

          navigate("/hospital/hosInfo");
        });
      } else {
        setError("Phone number should be 11 digits");
      }
    } else {
      setError("email already exists!");
    }
  };

  return (
    <div className="body choosePath">
      <div class="wrapper content userRegister">
        <section class="form signup">
          <header>Hospital Sign up</header>
          <form onSubmit={handleSubmit}>
            <div>{errorMsg && <Alert severity="error">{errorMsg}</Alert>}</div>
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
                  setHospital({ ...hospital, phone_number: e.target.value })
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

            <div class="field button">
              <button type="submit" className="next-btn">
                Next
                <ArrowRightIcon />
              </button>
            </div>
            <div class="link text-center">
              <Link to={"/login"}>login now</Link>{" "}
              Or Register as
              <Link to={"/user/register"}>User</Link>?
            </div>
          </form>
        </section>
      </div>
    </div>
  );
}
