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
import PublishedWithChangesIcon from "@mui/icons-material/PublishedWithChanges";
import { Slide, ToastContainer, Zoom, toast } from "react-toastify";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const UserMedicalInfo = () => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const navigate = useNavigate();
    const [medicalInfo , setMedicalInfo]= useState({
        surgery_last_3_months: "",
        visted_dentist_last_3_months: "",
        chronic_disease: "",
        last_donate_time: "",
        blood_type: "",
        legal_to_donate: null,
        note: "",
        location_latitude: "",
        location_longitude: "",
        date: "",
    });
    const [errorMsg, setError] = useState("");
    // const [updatedMedicalInfo, setUpdatedMedicalInfo] = useState({
    //     surgery_last_3_months: medicalInfo.surgery_last_3_months,
    //     visted_dentist_last_3_months:medicalInfo.visted_dentist_last_3_months,
    //     chronic_disease: medicalInfo.visted_dentist_last_3_months,
    //     last_donate_time: medicalInfo.last_donate_time,
    //     blood_type:medicalInfo.blood_type,
    //     legal_to_donate: medicalInfo.legal_to_donate,
    //     note: medicalInfo.note,
    //     date:medicalInfo.date
    //   });
    const getUserMedicalInfo=(id)=>{
        fetch(`http://localhost:8000/api/get-user-medical-info/${id}`)
        .then(res=>res.json())
        .then(data=>{setMedicalInfo({
            surgery_last_3_months: data.surgery_last_3_months,
            visted_dentist_last_3_months:data.visted_dentist_last_3_months,
            chronic_disease: data.visted_dentist_last_3_months,
            last_donate_time: data.last_donate_time,
            blood_type:data.blood_type,
            legal_to_donate: data.legal_to_donate,
            note: data.note,
            date:data.date.replace(/ /g, '')
          });});
    }
    useEffect(()=>{
        getUserMedicalInfo(currentUser.id);
    },[])

    const handleSubmit = (e)=>{
        e.preventDefault();
        fetch(`http://localhost:8000/api/update-user-medical-info/${currentUser.id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(medicalInfo),
          })
            .then((res) => res.json())
            .then((data) => {
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
            });
        
    }
    return(
        <div className="body choosePath my-5">
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
        <div class="wrapper userRegister content my-5">
          <section class="form signup">
            <header>Medical Information</header>
            <form onSubmit={handleSubmit}>
              <div>{errorMsg && <Alert severity="error">{errorMsg}</Alert>}</div>
              <TextField
                className="my-2"
                select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="are you make a sergery last 3 months?"
                onChange={(e) => {
                  if (e.target.value != "") {
                    setMedicalInfo({
                      ...medicalInfo,
                      surgery_last_3_months: e.target.value,
                    });
                  }
                }}
                required
                value={medicalInfo.surgery_last_3_months}
              >
                <MenuItem  value="yes">yes</MenuItem>
                <MenuItem value="no">no</MenuItem>
              </TextField>
              <TextField
                className="my-2"
                select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="are you make a sergery last 3 months?"
                onChange={(e) => {
                  if (e.target.value != "") {
                    setMedicalInfo({
                      ...medicalInfo,
                      visted_dentist_last_3_months: e.target.value,
                    });
                  }
                }}
                required
                value={medicalInfo.visted_dentist_last_3_months}
              >
                <MenuItem  value="yes">yes</MenuItem>
                <MenuItem value="no">no</MenuItem>
              </TextField>
              <TextField
                className="my-2"
                select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="are you make a sergery last 3 months?"
                onChange={(e) => {
                  if (e.target.value != "") {
                    setMedicalInfo({
                      ...medicalInfo,
                      chronic_disease: e.target.value,
                    });
                  }
                }}
                required
                value={medicalInfo.chronic_disease}
              >
                <MenuItem  value="yes">yes</MenuItem>
                <MenuItem value="no">no</MenuItem>
              </TextField>
  
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
                value={medicalInfo.blood_type}
              >
                <MenuItem  value="A">A</MenuItem>
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
                  rows="4"
                  value={medicalInfo.note}
                  onChange={(e) =>
                    setMedicalInfo({ ...medicalInfo, note: e.target.value })
                  }
                ></textarea>
              </div>
  
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
    )
}
export default UserMedicalInfo;