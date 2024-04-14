import { MenuItem, TextField } from "@mui/material";
import Navbar from "../components/Navbar";
import donateImg from "../images/donate.png";
import { useEffect, useState } from "react";
import { Slide, ToastContainer, toast } from "react-toastify";
const Donate = () => {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    const [hospitals , setHospitals] = useState([]);
    const [choosedHospital , setChoosedHospital] = useState('');
    const [users , setUsers] = useState([]);
    const [currentUser , setCurrentUser] = useState('');
    const [selectedHospital , setSelectedHospital] = useState({});
    const getAllUsers = () => {
        fetch("http://localhost:8000/api/merge-user-data")
        .then((res) => res.json())
        .then((data) =>{
            setUsers(data);
          console.log(data);
        });
        if (user !== undefined) {
          console.log(user);
            const data = users.find((item) => item.user_id == user.id); 
            setCurrentUser(data); 
            console.log(data);
        }
    }
    const getAllHospitals = () => {
        fetch("http://localhost:8000/api/merge-hospital-data")
            .then((res) => res.json())
            .then((data) => {
                if (data !== null) {
                    setHospitals(data);
                }
            })
            .catch((error) => {
                console.error(error);
                toast.error("Error while fetching hospitals data", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            });
        if (hospitals !== null && choosedHospital !== null) {
            const data = hospitals.find((hospital) => hospital.hospital_id == choosedHospital); 
            setSelectedHospital(data);
        }
    }
      // Function to calc the distance between two locations
  const calcDistance = (location1_latitude, location1_longitude, location2_latitude, location2_longitude) => {
    const R = 6371; // Radius of the Earth in kilometers
    const lat1 = location1_latitude;
    const lon1 = location1_longitude;
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

    const handleRequest = () => {
        console.log(currentUser, selectedHospital);
        if (currentUser !== undefined && selectedHospital !== undefined ) {
            const distance = calcDistance(currentUser.location_latitude, currentUser.location_longitude, selectedHospital.location_latitude, selectedHospital.location_longitude);
            const data = {
                from_id:user.id,
                to_id:selectedHospital.hospital_id,
                distance:distance,
                donor_type:"user",
                status:"pending",
                blood_type:currentUser.blood_type
            }
            console.log(data);
            fetch("http://localhost:8000/api/donate-request", {
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
                    autoClose: 2200,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    transition: Slide,
                  });
                });
                setChoosedHospital("");
        }else{
            toast.error(`Choose Hospital or Blood Bank`, {
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
    }
    useEffect(() => {
        getAllHospitals();
        getAllUsers();
    },[choosedHospital,currentUser])


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
      <div className="donate container">
        <img src={donateImg} className="w-100" alt="" />
        <h3>Choose Hospital Or Blood bank </h3>
        <div className="row justify-content-md-between container justify-content-sm-center align-items-center">
            <TextField
            className="col-md-8 col-sm-12"
            id="outlined-select-currency"
            select
            label="Select"
            onChange={(e) => setChoosedHospital(e.target.value)}
            value={choosedHospital}
            >
                {hospitals.map((option , index) => (
                    <MenuItem key={index} value={option.hospital_id}>
                        {option.name}
                    </MenuItem>
                ))}
            </TextField>

            <button onClick={()=>handleRequest()} className="donate-btn my-sm-4  my-md-0 col-md-3 col-sm-6">Make Request</button>
        </div>
      </div>
    </div>
  );
};

export default Donate;
