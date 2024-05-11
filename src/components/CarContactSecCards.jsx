import img1 from "../images/communications.png";
import img2 from "../images/open-24-hours.png";
import img3 from "../images/email.png";
import img4 from "../images/location-map.png";
const CarContactSecCards = () => {
    return(
        <div className="container boxes">
        <div className="box">
          <img src={img3} alt="" />
          <h5 className="title" data-goal="135">
            Emails:
          </h5>
          <h6 className="value">Person@gmail.com</h6>
        </div>
        <div className="box">
          <img src={img1} alt="" />
          <h5 className="title" data-goal="135">
            Mobile:
          </h5>
          <h6 className="value">+201092127269</h6>
        </div>
        <div className="box">
          <img src={img2} alt="" />
          <h5 className="title" data-goal="135">
            Working Hours:
          </h5>
          <h6 className="value">8:00 AM - 5:00 PM</h6>
        </div>
        <div className="box">
          <img src={img4} alt="" />
          <h5 className="title" data-goal="135">
            Location:
          </h5>
          <h6 className="value">Egypt, Menoufia University</h6>
        </div>
      </div>
    )
}

export default CarContactSecCards