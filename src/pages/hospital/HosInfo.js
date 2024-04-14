import { Alert, Grid, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router";
import { ToastContainer, Zoom, toast } from "react-toastify";

export default function HosInfo() {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  // we will put the all emils in medical api in this array to make sure the email not already exist
  const [emails, setEmails] = useState([]);

  // get the current user email
  const emailAddress = currentUser?.id;
  const navigate = useNavigate();
  const [errorMsg, setError] = useState("");

  // set default values for medical info
  const [hospitalInfo, setHospitalInfo] = useState({
    hospital_id: currentUser ? emailAddress : "",
    count_A: "",
    count_B: "",
    count_O: "",
    count_AB: "",
    count_Ap: "",
    count_Bp: "",
    count_Op: "",
    count_ABp: "",
    location_latitude: "",
    location_longitude: "",
  });

  // // set default values for user location
  // const [userLocation, setUserLocation] = useState({
  //   id: null,
  //   email: currentUser ? emailAddress : "",
  //   location_latitude: "",
  //   location_longitude: "",
  // });

  // Define a function to get the user's location using Geolocation API
  const getUserLocation = () => {
    // Check if geolocation is supported
    if (navigator.geolocation) {
      // Get the current position
      navigator.geolocation.getCurrentPosition(
        // Success callback
        (position) => {
          // Update the userLocation state with the coordinates
          setHospitalInfo({
            ...hospitalInfo,
            location_latitude: position.coords.latitude,
            location_longitude: position.coords.longitude,
          });
        },
        // Error callback
        (error) => {
          // Display an error message
          alert(error.message);
        }
      );
    } else {
      // Display a message if geolocation is not supported
      alert("Geolocation is not supported by your browser");
    }
  };

  //   get all emails in medical api
  const getAllHospitals= () => {
    fetch("http://localhost:8000/api/get-hospitals-medical-info")
      .then((res) => res.json())
      .then((data) => setEmails(data));
  };
  useEffect(() => {
    getAllHospitals();
    getUserLocation();
  }, []);
  // check if email is exist or not if exist this mean we enter the data before
  const emailExist = emails.some((e) => e.id === emailAddress);
  console.log(emailExist);
  if (emailExist) {
    // navigate("/hospital/hosRegister");
    setError("you entered data before");
  }
  // handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(hospitalInfo);
    // set date
    if (currentUser !== null && !emailExist) {
      if (
        hospitalInfo.count_A >= 0 &&
        hospitalInfo.count_AB >= 0 &&
        hospitalInfo.count_B >= 0 &&
        hospitalInfo.count_O >= 0 &&
        hospitalInfo.count_ABp >= 0 &&
        hospitalInfo.count_Ap >= 0 &&
        hospitalInfo.count_Bp >= 0 &&
        hospitalInfo.count_Op >= 0
      ) {
        setError("");
        // set user medical info send data to api
        fetch("http://localhost:8000/api/save-hospital-medical-info", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(hospitalInfo),
        }).then((response) => {
         
          setHospitalInfo({
            id: null,
            email: "",
            count_A: "",
            count_B: "",
            count_O: "",
            count_AB: "",
            count_Ap: "",
            count_Bp: "",
            count_Op: "",
            count_ABp: "",
            location_latitude: "",
            location_longitude: "",
          });
          navigate("/home");
        });
        // set user location send data to api
        // fetch("http://localhost:800/locations", {
        //   method: "POST",
        //   headers: {
        //     "Content-Type": "application/json",
        //   },
        //   body: JSON.stringify(userLocation),
        // }).then((response) => {
        //   setUserLocation({
        //     id: null,
        //     email: "",
        //     location_latitude: "",
        //     location_longitude: "",
        //   });

        //   navigate("/home");
        // });
      } else {
        setError("all fields must greater than 0");
      }
    } else {
      navigate("/hospital/hosRegister");
    }
  };
  return (
    <div className="body choosePath">
      <div class="wrapper content userRegister">
      
        <section class="form container signup">
          <header className="mb-3">hospital Information</header>
          <form onSubmit={handleSubmit} className="hosinfo_row">
            {errorMsg && <Alert severity="error">{errorMsg}</Alert>}

            <Row className="">
              <Col sm={12} md={6} >
                <TextField
                  
                  className="mb-3"
                  label="blood type A count"
                  variant="outlined"
                  type="number"
                  name="count_A"
                  value={hospitalInfo.count_A}
                  onChange={(e) =>
                    setHospitalInfo({
                      ...hospitalInfo,
                      count_A: e.target.value,
                    })
                  }
                  required
                />
              </Col>
              <Col sm={12} md={6} >
                <TextField
                  className="mb-3"
                  label="blood type B count"
                  variant="outlined"
                  type="number"
                  name="count_B"
                  value={hospitalInfo.count_B}
                  onChange={(e) =>
                    setHospitalInfo({
                      ...hospitalInfo,
                      count_B: e.target.value,
                    })
                  }
                  required
                />
              </Col>
            </Row>
            <Row>
              <Col  sm={12} md={6} >
                <TextField
                  className="mb-3"
                  label="blood type O count"
                  variant="outlined"
                  type="number"
                  name="count_O"
                  value={hospitalInfo.count_O}
                  onChange={(e) =>
                    setHospitalInfo({
                      ...hospitalInfo,
                      count_O: e.target.value,
                    })
                  }
                  required
                />
              </Col>
              <Col  sm={12} md={6}>
                <TextField
                  label="blood type AB count"
                  variant="outlined"
                  type="number"
                  name="count_AB"
                  value={hospitalInfo.count_AB}
                  onChange={(e) =>
                    setHospitalInfo({
                      ...hospitalInfo,
                      count_AB: e.target.value,
                    })
                  }
                  required
                />
              </Col>
            </Row>
            <Row>
              <Col  sm={12} md={6}>
                <TextField
                  className="mb-3"
                  label="blood type A+ count"
                  variant="outlined"
                  type="number"
                  name="count_Ap"
                  value={hospitalInfo.count_Ap}
                  onChange={(e) =>
                    setHospitalInfo({
                      ...hospitalInfo,
                      count_Ap: e.target.value,
                    })
                  }
                  required
                />
              </Col>
              <Col  sm={12} md={6}>
                <TextField
                  className="mb-3"
                  label="blood type B+ count"
                  variant="outlined"
                  type="number"
                  name="count_Bp"
                  value={hospitalInfo.count_Bp}
                  onChange={(e) =>
                    setHospitalInfo({
                      ...hospitalInfo,
                      count_Bp: e.target.value,
                    })
                  }
                  required
                />
              </Col>
            </Row>
            <Row>
              <Col  sm={12} md={6}>
                <TextField
                  className="mb-3"
                  label=" blood type O+ count"
                  variant="outlined"
                  type="number"
                  name="count_Op"
                  value={hospitalInfo.count_Op}
                  onChange={(e) =>
                    setHospitalInfo({
                      ...hospitalInfo,
                      count_Op: e.target.value,
                    })
                  }
                  required
                />
              </Col>
              <Col  sm={12} md={6}>
                
                <TextField
                  className="mb-3" 
                  label="blood type AB+ count"
                  variant="outlined"
                  type="number"
                  name="count_ABp"
                  value={hospitalInfo.count_ABp}
                  onChange={(e) =>
                    setHospitalInfo({
                      ...hospitalInfo,
                      count_ABp: e.target.value,
                    })
                  }
                  required
                />
              </Col>
            </Row>
            <div class="field button text-center">
              <button type="submit" className="next-btn ">Finish</button>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
}
