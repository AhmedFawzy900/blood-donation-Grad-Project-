import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import LanguageIcon from '@mui/icons-material/Language';
const CarFooter = () => {
  return (
    <footer class="footer">
      <div class="waves">
        <div class="wave" id="wave1"></div>
        <div class="wave" id="wave2"></div>
        <div class="wave" id="wave3"></div>
        <div class="wave" id="wave4"></div>
      </div>
      <ul class="social-icon">
        <li class="social-icon__item">
          <a class="social-icon__link" href="#">
            <FacebookIcon />
          </a>
        </li>
        <li class="social-icon__item">
          <a class="social-icon__link" href="#">
            <LinkedInIcon />
          </a>
        </li>
        <li class="social-icon__item">
          <a class="social-icon__link" href="#">
            <InstagramIcon />
          </a>
        </li>
        <li class="social-icon__item">
          <a class="social-icon__link" href="#">
            <LanguageIcon />
          </a>
        </li>
      </ul>
      <ul class="menu">
        <li class="menu__item">
          <a class="menu__link" href="#about">
            About
          </a>
        </li>
        <li class="menu__item">
          <a class="menu__link" href="#services">
            Services
          </a>
        </li>
        <li class="menu__item">
          <a class="menu__link" href="#gallery">
            Gallary
          </a>
        </li>
        <li class="menu__item">
          <a class="menu__link" href="#">
            Contact Us
          </a>
        </li>
      </ul>
      <p>&copy;2024 Ahmed Attia | All Rights Reserved</p>
    </footer>
  );
};

export default CarFooter;
