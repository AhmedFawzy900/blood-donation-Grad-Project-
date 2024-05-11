import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

function CarNavbar() {
  return (
    <div className ="header" id="header">
    <div className="container">
        <a href="#" className="logo">MediTour</a>
        <ul className="main-nav">
            <li>
                <a href="#about" className="about">About</a>
            </li>
            <li>
                <a href="#gallary" className="gallary">Gallary</a>
            </li>
            <li>
                <a href="#services" className="services">Services</a>
            </li>
           
            <li>
                <a href="#contact-sec" className="other-links">Contact Us</a>
            </li>
            
        </ul>
    </div>
</div>

  );
}

export default CarNavbar;