import { useEffect, useState } from "react";
import ReactDatePicker from "react-datepicker";
import { useNavigate } from "react-router";
import DatePicker from "react-datepicker";
import { TextareaAutosize } from "@mui/base";
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import "react-datepicker/dist/react-datepicker.css"; // Import the CSS styles
import { InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { FormControl } from "react-bootstrap";
import { TextFields } from "@mui/icons-material";
import { Alert } from "@mui/material";
export default function MedicalInfo() {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const userId = currentUser?.id;
  console.log(userId);
  // we will put the all emils in medical api in this array to make sure the email not already exist
  const [emails, setEmails] = useState([]);

  // get the current user email
  const emailAddress = currentUser?.email;
  const navigate = useNavigate();
  const [errorMsg, setError] = useState("");
  //   calc the date of today
  const currentDate = new Date();
  const day = currentDate.getDate();
  const month = currentDate.getMonth() + 1; // Months are zero-indexed, so we add 1
  const year = currentDate.getFullYear();
  const formattedDate = `${year} - ${month < 10 ? `0${month}` : month} -${
    day < 10 ? `0${day}` : day
  }  `;

  console.log(formattedDate.substring(7, 9));
  // set default values for medical info
  const [medicalInfo, setMedicalInfo] = useState({
    user_id: userId,
    surgery_last_3_months: "",
    visted_dentist_last_3_months: "",
    chronic_disease: "",
    last_donate_time: "",
    blood_type: "",
    legal_to_donate: null,
    note: "",
    location_latitude: "",
    location_longitude: "",
    date: formattedDate,
  });

  // set default values for user location
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
          setMedicalInfo({
            ...medicalInfo,
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
  // const getAllEmails = () => {
  //   fetch("http://localhost:800/medicalInfo")
  //     .then((res) => res.json())
  //     .then((data) => setEmails(data));
  // };
  useEffect(() => {
    // getAllEmails();
    getUserLocation();
  }, []);
  // check if email is exist or not if exist this mean we enter the data before
  // const emailExist = emails.some((e) => e.email === emailAddress);
  // console.log(emailExist);
  // if (emailExist) {
  //   navigate("/user/register");
  // }

  //   calc the num of monthes sience last donate
  const calculateMonthsBetweenDates = (startDate, endDate) => {
    const startYear = parseInt(startDate.substring(0, 4));
    const startMonth = parseInt(startDate.substring(5, 7));
    const endYear = parseInt(endDate.substring(0, 4));
    const endMonth = parseInt(endDate.substring(7, 9));
    console.log(startYear, startMonth, endYear, endMonth);
    return (endYear - startYear) * 12 + (endMonth - startMonth);
  };
  // handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();

    //   calc the num of monthes sience last donate
    const months = calculateMonthsBetweenDates(
      medicalInfo.last_donate_time,
      formattedDate
    );
    if (
      medicalInfo.chronic_disease === "yes" ||
      medicalInfo.surgery_last_3_months === "yes" ||
      months < 3
    ) {
      setMedicalInfo((prevMedicalInfo) => ({
        ...prevMedicalInfo,
        legal_to_donate: "no",
      }));
      console.log("no");
      console.log(medicalInfo.legal_to_donate);
    } else {
      setMedicalInfo((prevMedicalInfo) => ({
        ...prevMedicalInfo,
        legal_to_donate: "yes",
      }));
      console.log("yes");
    }
    // set user medical info send data to api
    fetch("http://localhost:8000/api/save-user-medical-info", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(medicalInfo),
    }).then((response) => {
      console.log(response);
      console.log(medicalInfo);
      if (response.status === 200) {
        navigate("/home");
      } else {
        setError("Something went wrong, please try again ");
        setMedicalInfo({
          surgery_last_3_months: "",
          visted_dentist_last_3_months: "",
          chronic_disease: "",
          last_donate_time: "",
          blood_type: "",
          legal_to_donate: null,
          note: "",
        });
      }
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

    //   navigate("/login");
    // });
  };
  return (
    <div className="body choosePath">
      <div class="wrapper userRegister content">
        <section class="form signup">
          <header>Medical Information</header>
          <form onSubmit={handleSubmit}>
            <div>{errorMsg && <Alert severity="error">{errorMsg}</Alert>}</div>
            <div class="field input">
              <label>are you make a sergery last 3 months?</label>
              <div className="d-flex justify-content-evenly align-items-center">
                <div className="mx-2">
                  <input
                    type="radio"
                    id="make_surgery"
                    name="options"
                    value="yes"
                    onChange={(e) =>
                      setMedicalInfo({
                        ...medicalInfo,
                        surgery_last_3_months: e.target.value,
                      })
                    }
                  />
                  <label htmlFor="make_surgery" className="mx-1">
                    yes
                  </label>
                </div>
                <div>
                  <input
                    type="radio"
                    id="no_surgery"
                    name="options"
                    value="no"
                    onChange={(e) =>
                      setMedicalInfo({
                        ...medicalInfo,
                        surgery_last_3_months: e.target.value,
                      })
                    }
                  />
                  <label htmlFor="no_surgery" className="mx-1">
                    no
                  </label>
                </div>
              </div>
            </div>
            <div class="field input">
              <label>are you visited a dentist last 3 months?</label>
              <div className="d-flex justify-content-evenly align-items-center">
                <div>
                  <input
                    type="radio"
                    id="visit_dentist"
                    name="dentist"
                    value="yes"
                    onChange={(e) =>
                      setMedicalInfo({
                        ...medicalInfo,
                        visted_dentist_last_3_months: e.target.value,
                      })
                    }
                  />
                  <label htmlFor="visit_dentist" className="mx-1">
                    yes
                  </label>
                </div>
                <div>
                  <input
                    type="radio"
                    id="no_dentist"
                    name="dentist"
                    value="no"
                    onChange={(e) =>
                      setMedicalInfo({
                        ...medicalInfo,
                        visted_dentist_last_3_months: e.target.value,
                      })
                    }
                  />
                  <label htmlFor="no_dentist" className="mx-1">
                    no
                  </label>
                </div>
              </div>
            </div>
            <div class="field input">
              <label>are you have chronic disease?</label>
              <div className="d-flex justify-content-evenly align-items-center">
                <div>
                  <input
                    type="radio"
                    id="have_chronic"
                    name="chronic"
                    value="yes"
                    onChange={(e) =>
                      setMedicalInfo({
                        ...medicalInfo,
                        chronic_disease: e.target.value,
                      })
                    }
                  />
                  <label htmlFor="have_chronic" className="mx-1">
                    yes
                  </label>
                </div>
                <div>
                  <input
                    type="radio"
                    id="no_chronic"
                    name="chronic"
                    value="no"
                    onChange={(e) =>
                      setMedicalInfo({
                        ...medicalInfo,
                        chronic_disease: e.target.value,
                      })
                    }
                  />
                  <label htmlFor="no_chronic" className="mx-1">
                    no
                  </label>
                </div>
              </div>
            </div>

            <div class="field input donate_time">
              <label for="donate_date">last donate time:</label>
              <input
                type="date"
                id="donate_date"
                name="donate_date"
                onChange={(e) =>
                  setMedicalInfo({
                    ...medicalInfo,
                    last_donate_time: e.target.value,
                  })
                }
              />
            </div>
            <TextField
              className="my-2"
              select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Blood Type"
              onChange={(e) => {
                if (e.target.value != "") {
                  setMedicalInfo({
                    ...medicalInfo,
                    blood_type: e.target.value,
                  });
                }
              }}
              required
            >
              <MenuItem value="A">A</MenuItem>
              <MenuItem value="Ap">A+</MenuItem>
              <MenuItem value="B">B</MenuItem>
              <MenuItem value="Bp">B+</MenuItem>
              <MenuItem value="AB">AB</MenuItem>
              <MenuItem value="ABp">AB+</MenuItem>
              <MenuItem value="O">O</MenuItem>
              <MenuItem value="Op">O+</MenuItem>
            </TextField>

            <div class="field input">
              <label for="note">note:</label>
              <br />
              <textarea
                name="note"
                id="note"
                cols="40"
                rows="5"
                onChange={(e) =>
                  setMedicalInfo({ ...medicalInfo, note: e.target.value })
                }
              ></textarea>
            </div>

            <div class="field button text-center">
              <button type="submit" className="next-btn ">
                Finish
              </button>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
}
