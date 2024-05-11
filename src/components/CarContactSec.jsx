
import CarContactSecCards from "./CarContactSecCards";
import CarContactSecForm from "./CarContactSecForm";
import CarContactSecMap from "./CarContactSecMap";

const CarContactSec = () => {
  return (
    <div className="contact-sec" id="contact-sec">
      <div className="main-title">
        <h1>Contact Us</h1>
      </div>
      {/* cards */}
      <CarContactSecCards />
      {/* form and maps */}
      <div
        className="contact-us d-flex justify-content-evenly align-items-center"
        id="contact-us"
      >
        {/* google map component */}
        <CarContactSecMap />
        {/*contact form */}
        <CarContactSecForm />
      </div>
    </div>
  );
};

export default CarContactSec;
