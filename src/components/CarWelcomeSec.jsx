import welcomeImg from "../images/ambulance.png";
import backImg from "../images/blob.svg";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";
import shuttle from "../images/shuttle.png";

const CarWelcomeSec = () => {
  return (
    <div className="car-landing text-center">
      <div className="container">
        <div className="text text-left">
          <h1>
            Journey to Wellness, Comfort in Motion
            {/* <span>
              <img src={shuttle} alt="" />{" "}
            </span> */}
          </h1>
          <p>
            Welcome to <b>MediTour</b>, where your health and comfort during
            transport are our utmost concern. Our specialized non-emergency
            medical transport service is designed to provide patients with a
            safe, comfortable, and reliable transportation option for all
            medical-related appointments.
          </p>
          <button>Read More..</button>
        </div>
        <div className="image">
          <img src={welcomeImg} alt="" className="welcomeImg" />
          <img src={backImg} alt="" className="backImg" />
        </div>
      </div>
      <a href="#about" className="go-down">
        <KeyboardDoubleArrowDownIcon />
      </a>
    </div>
  );
};

export default CarWelcomeSec;
