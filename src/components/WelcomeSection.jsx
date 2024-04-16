import welcomeImg from "../images/blood-donation-vector-illustration.png";
import GetAppIcon from '@mui/icons-material/GetApp';
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";
const WelcomeSection = () => {
  return (
    <div class="landing">
      <div class="container">
        <div class="text">
          <h1>Donate Blood Save Life</h1>
          <p>
            Your decision to donate blood can save up to three lives. Our
            community is built on the foundation of generosity and compassion,
            where every drop counts. Join us in our mission to ensure that every
            person in need has access to this precious gift of life.
          </p>
          <button><GetAppIcon/> Download App</button>
        </div>
        <div class="image">
          <img src={welcomeImg} alt="" />
        </div>
      </div>
      <a href="#why-to-donate" class="go-down">
        <KeyboardDoubleArrowDownIcon />
      </a>
    </div>
  );
};

export default WelcomeSection;
