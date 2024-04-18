import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

function CarNavbar() {
  return (
    <div class="header" id="header">
    <div class="container">
        <a href="#" class="logo">MiditTour</a>
        <ul class="main-nav">
            <li>
                <a href="#about" class="about">About</a>
            </li>
            <li>
                <a href="#gallary" class="gallary">Gallary</a>
            </li>
            <li>
                <a href="#services" class="services">Services</a>
            </li>
           
            <li>
                <a href="#" class="other-links">Make a Request</a>
            </li>
            
        </ul>
    </div>
</div>

  );
}

export default CarNavbar;