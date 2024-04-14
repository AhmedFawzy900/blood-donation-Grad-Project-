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


const MyRequests = ({
    allRequestsData,
    currentUser,
    AllMergedHospitals,
    AllMergedUsers,
  }) => {
    const [allRequests, setAllRequests] = useState(allRequestsData);
    const getAllRequests = () => {
        fetch("http://localhost:8000/api/get-requests")
        .then((res) => res.json())
        .then((data) => setAllRequests(data));
    };
    useEffect(() => {
        getAllRequests();
      }, []);
    const handleCancel = (id) => {
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
            fetch(`http://localhost:8000/api/delete-request/${id}`, {
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
                    title: "Request canceled successfully",
                    showConfirmButton: false,
                    timer: 1300,
                  });
                  getAllRequests();
              });
          }
        });
      };
      const handleDone = (id) => {
        fetch(`http://localhost:8000/api/update-request/${id}`, {
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
            getAllRequests();

          });
      };
    return (
        <div className="row justify-content-center">
              {allRequests
                .filter((request) => request.from_id == currentUser.id)
                .filter(
                  (request) =>
                    request.donor_type == "blood_bank" ||
                    request.donor_type == "hospital"
                )
                .map((request, index) => (
                  <>
                    {AllMergedHospitals.filter(
                      (hospital) => hospital.hospital_id == request.to_id
                    ).map((hos, index) => (
                      <div
                        className="result-card col-lg-3 col-md-6 col-sm-10"
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
                              {hos.type == "blood_bank"
                                ? "Blood Bank"
                                : "Hospital"}
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
                            {request.status == "accepted" ? (
                              <button
                                type="button"
                                className="first-btn "
                                onClick={() => handleDone(request.id)}
                              >
                                Done
                                <HowToRegIcon className="done-btn" />
                              </button>
                            ) : (
                              <button
                                type="button"
                                className="first-btn reject-btn"
                                onClick={() => handleCancel(request.id)}
                              >
                                Cancel
                                <CloseIcon />
                              </button>
                            )}

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
                              {request.status == "done" && (
                                <>
                                  <CheckCircleOutlineIcon className="done-icon" />{" "}
                                  Done
                                </>
                              )}
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </>
                ))}
              {allRequests
                .filter((request) => request.from_id == currentUser.id)
                .filter((request) => request.donor_type == "user")
                .map((request, index) => (
                  <>
                    {AllMergedUsers.filter(
                      (hospital) => hospital.user_id == request.to_id
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
                              {hos.gender} , {hos.age} yrs old
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
                            {request.status == "accepted" ? (
                              <button
                                type="button"
                                className="first-btn "
                                onClick={() => handleDone(request.id)}
                              >
                                Done
                                <HowToRegIcon className="done-btn" />
                              </button>
                            ) : (
                              <button
                                type="button"
                                className="first-btn reject-btn"
                                onClick={() => handleCancel(request.id)}
                              >
                                Cancel
                                <CloseIcon />
                              </button>
                            )}

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
            </div>
    );
};

export default MyRequests;