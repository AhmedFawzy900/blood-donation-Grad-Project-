import bld from "../images/Group.png";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import SendIcon from "@mui/icons-material/Send";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";
import AccessAlarmIcon from "@mui/icons-material/AccessAlarm";
import SocialDistanceIcon from "@mui/icons-material/SocialDistance";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";

const DonateRequests = ({
  donateRequestsData,
  currentUser,
  AllMergedHospitals,
  AllMergedUsers,
}) => {
  const [donateRequests, setDonateRequests] = useState(donateRequestsData);
  const [hosDonate, setHosDonate] = useState("");
  const getAllDonateRequests = () => {
    fetch("http://localhost:8000/api/get-donate-requests")
      .then((res) => res.json())
      .then((data) => setDonateRequests(data));
    if (currentUser.type != "user") {
      let filter = donateRequests
        .filter((request) => request.to_id == currentUser.id)
        .filter(
          (request) =>
            request.status !== "done" && request.status !== "rejected"
        );
      console.log(filter);
      setHosDonate(filter);
    }
  };
  useEffect(() => {
    getAllDonateRequests();
  }, []);

  const handleCancelDonate = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Cancel it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:8000/api/delete-donate-request/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((res) => res.json())
          .then((data) => {
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Request Canceled successfully",
              showConfirmButton: false,
              timer: 1300,
            });
            getAllDonateRequests();
          });
      }
    });
  };
  const handleAcceptDonate = (id) => {
    fetch(`http://localhost:8000/api/update-donate-request/${id}`, {
      method: "PUT",
      body: JSON.stringify({ status: "accepted" }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Request Accepted",
          showConfirmButton: false,
          timer: 1300,
        });
        getAllDonateRequests();
      });
  };
  const handleRejectDonate = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Cancel it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:8000/api/update-donate-request/${id}`, {
          method: "PUT",
          body: JSON.stringify({ status: "rejected" }),
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((res) => res.json())
          .then((data) => {
            getAllDonateRequests();
          });
      }
    });
  };

  const handleDoneDonate = (id) => {
    fetch(`http://localhost:8000/api/update-donate-request/${id}`, {
      method: "PUT",
      body: JSON.stringify({ status: "done" }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Donation Process Completed",
          showConfirmButton: false,
          timer: 1300,
        });
        getAllDonateRequests();
      });
  };

  return (
    <div className="row justify-content-center">
      {currentUser.type == "user" ? (
        <>
          {donateRequests
            .filter((request) => request.donor_type == "user")
            .filter((request) => request.status !== "done")
            .map((request, index) => (
              <>
                {AllMergedHospitals.filter(
                  (hospital) => hospital.hospital_id == request.to_id
                ).map((hos, index) => (
                  <div
                    className="result-card col-lg-3 col-md-4 col-sm-10"
                    key={index}
                  >
                    <div className="row">
                      <div className="col-4 col-xs-4 blood-name">
                        <img src={bld} alt="" />
                        <h2>
                          {request.blood_type == "Op"
                            ? "O+"
                            : request.blood_type == "ABp"
                            ? "AB+"
                            : request.blood_type == "Bp"
                            ? "B+"
                            : request.blood_type == "Ap"
                            ? "A+"
                            : request.blood_type}
                        </h2>
                      </div>
                      <div className="col-8 col-xs-8 donor-data">
                        <h1>
                          {hos.type == "hospital" ? "Hospital" : "Blood Bank"}
                        </h1>
                        <p>
                          <PersonIcon />
                          {hos.name}
                        </p>
                        <p>
                          <EmailIcon />
                          {hos.email}
                        </p>
                        <p>
                          <SocialDistanceIcon />
                          {request.distance} km
                        </p>
                      </div>
                      <div className="request-btn ">
                        <button
                          type="button"
                          className="first-btn reject-btn"
                          onClick={() => handleCancelDonate(request.id)}
                        >
                          Cancel
                          <CloseIcon />
                        </button>

                        <button type="button" className="accept-btn">
                          {request.status == "pending" && (
                            <>
                              <AccessAlarmIcon className="pending-icon" />{" "}
                              Pending
                            </>
                          )}
                          {request.status == "accepted" && (
                            <>
                              <CheckCircleOutlineIcon /> Accepted
                            </>
                          )}
                          {request.status == "rejected" && (
                            <>
                              <ErrorOutlineIcon className="reject-icon" />{" "}
                              Rejected
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </>
            ))}
        </>
      ) : (
        <>
          {donateRequests
            .filter((request) => request.to_id == currentUser.id)
            .filter(
              (request) =>
                request.status !== "done" && request.status !== "rejected"
            )
            .map((request) => {
              const user = AllMergedUsers.find(
                (user) => user.user_id == request.from_id
              );

              return (
                <div
                  className="result-card col-lg-3 col-md-6 col-sm-10"
                  key={request.id}
                >
                  <div className="row">
                    <div className="col-4 col-xs-4 blood-name">
                      <img src={bld} alt="" />
                      <h2>
                        {request.blood_type === "Op"
                          ? "O+"
                          : request.blood_type === "ABp"
                          ? "AB+"
                          : request.blood_type === "Bp"
                          ? "B+"
                          : request.blood_type === "Ap"
                          ? "A+"
                          : request.blood_type}
                      </h2>
                    </div>
                    <div className="col-8 col-xs-8 donor-data">
                      <h1>
                        {user.age} yrs, {user.gender}
                      </h1>
                      <p>
                        <PersonIcon />
                        {user.name}
                      </p>
                      <p>
                        <EmailIcon />
                        {user.email}
                      </p>
                      <p>
                        <SocialDistanceIcon />
                        {request.distance} km
                      </p>
                    </div>
                    <div className="request-btn">
                      {request.status === "accepted" ? (
                        <>
                          <button
                            type="button"
                            className="first-btn"
                            onClick={() => handleDoneDonate(request.id)}
                          >
                            Done
                            <HowToRegIcon className="done-btn" />
                          </button>
                          <button
                            type="button"
                            className="reject-btn"
                            onClick={() => handleCancelDonate(request.id)}
                          >
                            Cancel
                            <CloseIcon />
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            type="button"
                            className="first-btn reject-btn"
                            onClick={() => handleRejectDonate(request.id)}
                          >
                            Reject
                            <CloseIcon />
                          </button>
                          <button
                            onClick={() => handleAcceptDonate(request.id)}
                            type="button"
                            className="accept-btn"
                          >
                            Accept
                            <DoneIcon />
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
        </>
      )}
    </div>
  );
};
export default DonateRequests;
