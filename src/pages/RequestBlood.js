import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import elipse1 from "../images/Ellipse 6.png";
import elipse2 from "../images/Ellipse 7-1.png";
import elipse3 from "../images/Ellipse 7.png";
import bld from "../images/Group.png";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import SocialDistanceIcon from "@mui/icons-material/SocialDistance";
import SendIcon from "@mui/icons-material/Send";
import { click } from "@testing-library/user-event/dist/click";
import { Slide, ToastContainer, Zoom, toast } from "react-toastify";
export default function RequestBlood() {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const emailAddress = currentUser.email;
  const [allLocations, setAllLocations] = useState([]);
  const [allHosLocations, setAllHosLocations] = useState([]);
  const [userLocation, setUserLocation] = useState({
    location_latitude: 0,
    location_longitude: 0,
  });
  const [allUsersDistances, setAllUsersDistances] = useState([]);
  const [allHospitalsDistances, setAllHospitalssDistances] = useState([]);
  const [bloodType, setBloodType] = useState("");
  const [donorTypes, setDonorTypes] = useState([]);
  const [hospitalAddress, setHospitalAddress] = useState("");
  // Define a function to get the user's location using Geolocation API
  const getUserLocation = () => {
    // Check if geolocation is supported
    if (navigator.geolocation) {
      // Get the current position
      navigator.geolocation.getCurrentPosition(
        // Success callback
        (position) => {
          // Update the userLocation state with the coordinates
          setUserLocation({
            ...userLocation,
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

  useEffect(() => {
    getAllUsersLocations();
    getUserLocation();
    getAllHospitalsLocations();
  }, [bloodType, donorTypes]);

  // Function to calc the distance between two locations
  const calcDistance = (location1, location2_latitude, location2_longitude) => {
    const R = 6371; // Radius of the Earth in kilometers
    const lat1 = location1.location_latitude;
    const lon1 = location1.location_longitude;
    const lat2 = location2_latitude;
    const lon2 = location2_longitude;

    const dLat = (lat2 - lat1) * (Math.PI / 180); // Difference in latitude in radians
    const dLon = (lon2 - lon1) * (Math.PI / 180); // Difference in longitude in radians

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) *
        Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c; // Distance in kilometers
  };

  // Fetch all user location and data locations
  const getAllUsersLocations = () => {
    fetch("http://localhost:8000/api/merge-user-data")
      .then((res) => res.json())
      .then((data) => {
        setAllLocations(data);
        console.log(data);
        if (
          userLocation.location_latitude !== 0 &&
          userLocation.location_longitude !== 0 &&
          userLocation.legal_to_donate !== "no"
        ) {
          const distances = allLocations.map((location) => ({
            user_id: location.user_id,
            email: location.email,
            name: location.name,
            age: location.age,
            gender: location.gender,
            blood_type: location.blood_type,
            type: location.type,
            distance: calcDistance(
              userLocation,
              location.location_latitude,
              location.location_longitude
            ).toFixed(2),
          }));
          setAllUsersDistances(distances);
        }
      })
      .catch((error) => {
        console.error("Error fetching locations:", error);
      });
  };
  // fetch all hospitals and bank data
  const getAllHospitalsLocations = () => {
    fetch("http://localhost:8000/api/merge-hospital-data")
      .then((res) => res.json())
      .then((data) => {
        setAllHosLocations(data);
        console.log(data);
        if (
          userLocation.location_latitude !== 0 &&
          userLocation.location_longitude !== 0
        ) {
          const distances2 = allHosLocations
            .filter((location) => location[`count_${bloodType}`] > 0)
            .map((location) => ({
              hospital_id: location.hospital_id,
              email: location.email,
              name: location.name,
              type: location.type,
              count_A: location.count_A,
              count_B: location.count_B,
              count_O: location.count_O,
              count_AB: location.count_Ap,
              count_Ap: location.count_Bp,
              count_Bp: location.count_Op,
              count_Op: location.count_AB,
              count_ABp: location.count_ABp,
              distance: calcDistance(
                userLocation,
                location.location_latitude,
                location.location_longitude
              ).toFixed(2),
            }));
          setAllHospitalssDistances(distances2);
        }
      })
      .catch((error) => {
        console.error("Error fetching locations:", error);
      });
  };

  const handleDonorTypeChange = (e) => {
    const value = e.target.value;
    if (donorTypes.includes(value)) {
      setDonorTypes(donorTypes.filter((type) => type !== value));
    } else {
      setDonorTypes([...donorTypes, value]);
    }
  };

  const makeRequest = (
    $to_id,
    $from_id,
    $distance,
    $donor_type,
    $bloodType,
    hospital_address,

  ) => {
    const data = {
      to_id: $to_id,
      from_id: $from_id,
      status: "pending",
      distance: $distance,
      donor_type: $donor_type,
      sender_type: currentUser.type,
      blood_type: $bloodType,
      hospital_address: hospital_address,
    };
    if (hospital_address === "") {
      toast.error(`Please Enter Hospital Address and Name`, {})
    }else{
      fetch("http://localhost:8000/api/request-blood", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((data) => {
          toast.success(`Request Sent Successfully`, {
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
        })
        .catch((error) => {
          toast.error(`Error Sending Request`, {
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
  };

  return (
    <div>
      <Navbar />
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
      <div className="mx-5">
        <div className="row my-5">
          <div className="blood-type col-lg-4">
            <img src={elipse1} alt="blood type" className="elipse1" />
            <img src={elipse2} alt="blood type" className="elipse2" />
            <img src={elipse3} alt="blood type" className="elipse3" />

            <div className="field input my-4">
              <TextField
                id="filled-basic"
                label="Enter the hospital or blood bank address and Name"
                className="patient-address"
                variant="filled"
                onChange={(e) => setHospitalAddress(e.target.value)}
              />
            </div>
            <div className="field input my-4">
              <FormControl variant="filled" fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Blood Type
                </InputLabel>
                <Select
                  className="input-blood"
                  value={bloodType}
                  onChange={(e) => setBloodType(e.target.value)}
                  name="blood_type"
                  required
                >
                  <MenuItem value="" selected disabled>
                    Select blood type
                  </MenuItem>
                  <MenuItem value="A">A</MenuItem>
                  <MenuItem value="Ap">A+</MenuItem>
                  <MenuItem value="B">B</MenuItem>
                  <MenuItem value="Bp">B+</MenuItem>
                  <MenuItem value="AB">AB</MenuItem>
                  <MenuItem value="ABp">AB+</MenuItem>
                  <MenuItem value="O">O</MenuItem>
                  <MenuItem value="Op">O+</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div className="d-flex flex-md-row flex-lg-row flex-sm-row    justify-content-evenly position-relative align-items-center my-4">
              {/* choose the type of dooner user or hos or bank or all */}
              <div className="check-div">
                <input
                  type="checkbox"
                  onChange={handleDonorTypeChange}
                  id="user"
                  name="user"
                  value="person"
                />
                <label for="user"> person</label>
              </div>
              <div className="check-div">
                <input
                  type="checkbox"
                  onChange={handleDonorTypeChange}
                  id="hospital"
                  name="hospital"
                  value="hospital"
                />
                <label for="hospital">hospital</label>
              </div>
              <div className="check-div">
                <input
                  type="checkbox"
                  onChange={handleDonorTypeChange}
                  id="bank"
                  name="bank"
                  value="bank"
                />
                <label for="bank">bank</label>
              </div>
              <div className="check-div">
                <input
                  onChange={handleDonorTypeChange}
                  type="checkbox"
                  id="all"
                  name="all"
                  value="all"
                />
                <label for="all">all</label>
              </div>
            </div>
          </div>

          <div className="results col-lg-8">
            <div className="row justify-content-evenly align-items-center">
              {allUsersDistances
                .filter((location) => location.blood_type === bloodType)
                .filter(
                  (location) =>
                    donorTypes.includes("person") || donorTypes.includes("all")
                )
                .filter((location) => location.email !== currentUser.email)
                .map((location, index) => (
                  <div
                    className="result-card col-lg-5 col-md-4 col-sm-10 col-xs-12"
                    key={index}
                  >
                    <div className="row">
                      <div className="col-4 col-xs-4 blood-name">
                        <img src={bld} alt="" />
                        <h2>
                          {location.blood_type == "Op"
                            ? "O+"
                            : location.blood_type == "ABp"
                            ? "AB+"
                            : location.blood_type == "Bp"
                            ? "B+"
                            : location.blood_type == "Ap"
                            ? "A+"
                            : location.blood_type}
                        </h2>
                        <p></p>
                      </div>
                      <div className="col-8 col-xs-8 donor-data">
                        <h1>
                          {location.gender} , {location.age} yrs old
                        </h1>
                        <p>
                          <PersonIcon />
                          {location.name}
                        </p>
                        <p>
                          <EmailIcon />
                          {location.email}
                        </p>
                        <p>
                          <SocialDistanceIcon />
                          {location.distance} km
                        </p>
                      </div>
                      <div className="request-btn">
                        <button
                          type="button"
                          onClick={() =>
                            makeRequest(
                              location.user_id,
                              currentUser.id,
                              location.distance,
                              location.type,
                              bloodType,
                              hospitalAddress
                            )
                          }
                        >
                          request
                          <SendIcon />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}

              {allHospitalsDistances
                .filter(
                  (location) =>
                    location.type === "hospital" &&
                    location[`count_${bloodType}`] > 0
                )
                .filter(
                  (location) =>
                    donorTypes.includes("hospital") ||
                    donorTypes.includes("all")
                )
                .filter((location) => location.email !== currentUser.email)
                .map((location, index) => (
                  <div
                    className="result-card col-lg-5 col-md-4 col-sm-11 col-xs-12"
                    key={index}
                  >
                    <div className="row">
                      <div className="col-4 col-xs-4 blood-name">
                        <img src={bld} alt="" />
                        <h2>
                          {bloodType == "Op"
                            ? "O+"
                            : bloodType == "ABp"
                            ? "AB+"
                            : bloodType == "Bp"
                            ? "B+"
                            : bloodType == "Ap"
                            ? "A+"
                            : bloodType}
                        </h2>
                        <p>{location[`count_${bloodType}`]} Units</p>
                      </div>
                      <div className="col-8 col-xs-8 donor-data">
                        <h1>Hospital</h1>
                        <p>
                          <PersonIcon />
                          {location.name}
                        </p>
                        <p>
                          <EmailIcon />
                          {location.email}
                        </p>
                        <p>
                          <SocialDistanceIcon />
                          {location.distance} km
                        </p>
                      </div>
                      <div className="request-btn">
                        <button
                          type="button"
                          onClick={() =>
                            makeRequest(
                              location.hospital_id,
                              currentUser.id,
                              location.distance,
                              location.type,
                              bloodType,
                              hospitalAddress
                            )
                          }
                        >
                          request
                          <SendIcon />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              {allHospitalsDistances
                .filter(
                  (location) =>
                    location.type === "blood_bank" &&
                    location[`count_${bloodType}`] > 0
                )
                .filter(
                  (location) =>
                    donorTypes.includes("bank") || donorTypes.includes("all")
                )
                .filter((location) => location.email !== currentUser.email)
                .map((location, index) => (
                  <div
                    className="result-card col-lg-5 col-md-4 col-sm-10"
                    key={index}
                  >
                    <div className="row">
                      <div className="col-4 col-xs-4 blood-name">
                        <img src={bld} alt="" />
                        <h2>
                          {bloodType == "Op"
                            ? "O+"
                            : bloodType == "ABp"
                            ? "AB+"
                            : bloodType == "Bp"
                            ? "B+"
                            : bloodType == "Ap"
                            ? "A+"
                            : bloodType}
                        </h2>
                        <p>{location[`count_${bloodType}`]} Units</p>
                      </div>
                      <div className="col-8 col-xs-8 donor-data">
                        <h1>Blood Bank</h1>
                        <p>
                          <PersonIcon />
                          {location.name}
                        </p>
                        <p>
                          <EmailIcon />
                          {location.email}
                        </p>
                        <p>
                          <SocialDistanceIcon />
                          {location.distance} km
                        </p>
                      </div>
                      <div className="request-btn">
                        <button
                          type="button"
                          onClick={() =>
                            makeRequest(
                              location.hospital_id,
                              currentUser.id,
                              location.distance,
                              location.type,
                              bloodType,
                              hospitalAddress
                            )
                          }
                        >
                          request
                          <SendIcon />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
