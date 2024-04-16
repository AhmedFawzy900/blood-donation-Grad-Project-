import { useEffect, useState } from "react";
import { Alert, Grid, TextField } from "@mui/material";

import { Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router";
import { ToastContainer, Zoom, toast ,Slide} from "react-toastify";
import PublishedWithChangesIcon from "@mui/icons-material/PublishedWithChanges";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const HosMedicalInfo = () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  // we will put the all emils in medical api in this array to make sure the email not already exist
  const [emails, setEmails] = useState([]);
  const navigate = useNavigate();
  // get the current user email
  const emailAddress = currentUser?.id;
  const [errorMsg, setError] = useState("");

  // set default values for medical info
  const [hospitalInfo, setHospitalInfo] = useState({
    count_A: "",
    count_B: "",
    count_O: "",
    count_AB: "",
    count_Ap: "",
    count_Bp: "",
    count_Op: "",
    count_ABp: "",
  });
  const getHospitalMedicalInfo = () => {
    fetch(
      "http://localhost:8000/api/get-hospital-medical-info/" + currentUser.id
    )
      .then((res) => res.json())
      .then((data) =>
        setHospitalInfo({
          count_A: data.count_A,
          count_B: data.count_B,
          count_O: data.count_O,
          count_AB: data.count_AB,
          count_Ap: data.count_Ap,
          count_Bp: data.count_Bp,
          count_Op: data.count_Op,
          count_ABp: data.count_ABp,
        })
      );
  };

  useEffect(() => {
    getHospitalMedicalInfo();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
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
      fetch(
        "http://localhost:8000/api/update-hospital-medical-info/" +
          currentUser.id,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(hospitalInfo),
        }
      ).then((response) => {
        if (response.status === 200) {
            toast.success(`Medical Info Updated Successfully`, {
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
        }else{
            toast.error(`Medical Info Not Updated`, {
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
        }
      });
    } else {
      setError("all fields must greater than 0");
    }
  };
  return (
    <div className="body choosePath">
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
      <div class="wrapper content userRegister">
        <section class="form container signup">
          <header className="mb-3">Blood Types Counters</header>
          <form onSubmit={handleSubmit} className="hosinfo_row">
            {errorMsg && <Alert severity="error">{errorMsg}</Alert>}

            <Row className="">
              <Col sm={12} md={6}>
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
              <Col sm={12} md={6}>
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
              <Col sm={12} md={6}>
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
              <Col sm={12} md={6}>
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
              <Col sm={12} md={6}>
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
              <Col sm={12} md={6}>
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
              <Col sm={12} md={6}>
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
              <Col sm={12} md={6}>
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
            <div class="field button d-flex justify-content-between align-items-center">
              <button type="submit" className="next-btn">
                Save Changes <PublishedWithChangesIcon />
              </button>
              <div className="medical_info-btn" onClick={()=>{navigate('/profile')}}>
                   Profile Data <ArrowForwardIcon />
                </div>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
};
export default HosMedicalInfo;
