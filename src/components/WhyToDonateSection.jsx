import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";
import Diversity1Icon from "@mui/icons-material/Diversity1";
import HealthAndSafetyIcon from "@mui/icons-material/HealthAndSafety";
const WhyToDonateSection = () => {
  return (
    <div className="why-to-donate" id="why-to-donate">
      <div className="main-title">
        <h1>Why Donate Blood</h1>
      </div>
      <div className="container">
        <div className="box">
          <div className="icon">
            <VolunteerActivismIcon />
          </div>
          <div className="text">
            <h5>Save lives </h5>
            <p>
              {" "}
              A single donation can save up to three lives, providing essential
              support for surgeries, cancer treatments, chronic illnesses, and
              traumatic injuries.
            </p>
          </div>
        </div>
        <div className="box">
          <div className="icon">
            <Diversity1Icon />
          </div>
          <div className="text">
            <h5>Community Contribution</h5>
            <p>
              By donating blood, you’re providing a vital service to the
              community and making a significant difference in the lives of
              others, which can boost your sense of well-being.
            </p>
          </div>
        </div>
        <div className="box">
          <div className="icon">
            <HealthAndSafetyIcon />
          </div>
          <div className="text">
            <h5>Health Check-Up</h5>
            <p>
              Donors receive a free mini-physical prior to donation, checking
              pulse, blood pressure, body temperature, and hemoglobin levels.
              This can help in identifying any potential health issues early.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhyToDonateSection;
