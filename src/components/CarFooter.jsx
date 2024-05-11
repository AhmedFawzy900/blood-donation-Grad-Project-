import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import XIcon from '@mui/icons-material/X';
const CarFooter = () => {
  return (
    <footer className="footer">
      <div className="waves">
        <div className="wave" id="wave1"></div>
        <div className="wave" id="wave2"></div>
        <div className="wave" id="wave3"></div>
        <div className="wave" id="wave4"></div>
      </div>
      <ul className="social-icon">
        <li className="social-icon__item">
          <a className="social-icon__link" href="#">
            <FacebookIcon />
          </a>
        </li>
        <li className="social-icon__item">
          <a className="social-icon__link" href="#">
            <LinkedInIcon />
          </a>
        </li>
        <li className="social-icon__item">
          <a className="social-icon__link" href="#">
            <InstagramIcon />
          </a>
        </li>
        <li className="social-icon__item">
          <a className="social-icon__link" href="#">
            <XIcon />
          </a>
        </li>
      </ul>
      <ul className="menu">
        <li className="menu__item">
          <a className="menu__link" href="#about">
            About
          </a>
        </li>
        <li className="menu__item">
          <a className="menu__link" href="#services">
            Services
          </a>
        </li>
        <li className="menu__item">
          <a className="menu__link" href="#gallery">
            Gallary
          </a>
        </li>
        <li className="menu__item">
          <a className="menu__link" href="#">
            Contact Us
          </a>
        </li>
      </ul>
      <p>&copy;2024 Ahmed Attia | All Rights Reserved</p>
    </footer>
  );
};

export default CarFooter;
