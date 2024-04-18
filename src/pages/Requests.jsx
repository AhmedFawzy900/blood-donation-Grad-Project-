import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import RecivedRequests from "../components/RecivedRequests";
import MyRequests from "../components/MyRequests";
import DonateRequests from "../components/DonateRequests";
import RequestsHeaderSection from "../components/RequestsHeaderSection";
const Requests = () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const [active, setActive] = useState(1);
  const [donateRequests, setDonateRequests] = useState([]);
  const [AllMergedUsers, setAllMergedUsers] = useState([]);
  const [AllMergedHospitals, setAllMergedHospitals] = useState([]);
  const [allRequests, setAllRequests] = useState([]);
  const getAllRequests = () => {
    fetch("http://localhost:8000/api/get-requests")
      .then((res) => res.json())
      .then((data) => setAllRequests(data));
  };
  useEffect(() => {
    (async () => {
      const response = await fetch("http://localhost:8000/api/merge-user-data");
      const data = await response.json();
      setAllMergedUsers(data);
      console.log(AllMergedUsers);
    })();
  }, []);
  const getAllHospitalsData = async () => {
    const response = await fetch(
      "http://localhost:8000/api/merge-hospital-data"
    );
    const data = await response.json();
    setAllMergedHospitals(data);
    console.log(AllMergedHospitals);
  };
  const getAllDonateRequests = () => {
    fetch("http://localhost:8000/api/get-donate-requests")
      .then((res) => res.json())
      .then((data) => setDonateRequests(data));
  };
  useEffect(() => {
    getAllRequests();
    getAllDonateRequests();
  }, [active]);
  useEffect(() => {
    getAllHospitalsData();
  }, []);
  return (
    <div>
      <Navbar />
      <div className="requests">
        <RequestsHeaderSection />
        <div className="buttons links">
          <button
            className={"mx-2".concat(active === 1 ? " active" : " login-btn")}
            onClick={() => setActive(1)}
          >
            Received Requests (
            {
              allRequests
                .filter((request) => request.to_id == currentUser.id)
                .filter((request) => request.status == "pending").length
            }
            )
          </button>
          <button
            className={"mx-2".concat(active === 2 ? " active" : " login-btn")}
            onClick={() => setActive(2)}
          >
            My Requests (
            {
              allRequests.filter((request) => request.from_id == currentUser.id)
                .length
            }
            )
          </button>
          <button
            className={"mx-2".concat(active === 3 ? " active" : " login-btn")}
            onClick={() => setActive(3)}
          >
            Donate Requests (
            {currentUser.type === "user"
              ? donateRequests.filter(
                  (request) => request.from_id == currentUser.id
                ).filter(
                  (request) =>
                    request.status !== "done"
                ).length
              : donateRequests.filter(
                  (request) => request.to_id == currentUser.id
                ).filter(
                  (request) =>
                    request.status !== "done" && request.status !== "rejected"
                ).length}
            )
          </button>
        </div>
        <div className="container">
          {active === 1 ? (
            <>
              <RecivedRequests allRequestsData={allRequests} currentUser={currentUser} AllMergedHospitals={AllMergedHospitals} AllMergedUsers={AllMergedUsers} />
            </>
          ) : active === 2 ? (
            <>
              <MyRequests allRequestsData={allRequests} currentUser={currentUser} AllMergedHospitals={AllMergedHospitals} AllMergedUsers={AllMergedUsers}  />
            </>
          ) : (
            <>
              <DonateRequests  donateRequestsData={donateRequests} currentUser={currentUser} AllMergedHospitals={AllMergedHospitals} AllMergedUsers={AllMergedUsers} />
            </>
          )}
        </div>
      </div>
    </div>
  );
};
export default Requests;
