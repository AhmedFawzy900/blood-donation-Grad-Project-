
import amb2 from "../images/amb2.jpg";
import amb3 from "../images/amb3.jpg";
import amb4 from "../images/amb4.jpg";
import amb5 from "../images/amb5.jpg";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
const CarAboutSec = () => {
  const data = [
    {
      title: "Tailored for Comfort",
      img:amb2,
      desc: "Our fleet of medical transport vehicles is specially tailored with advanced comfort and safety enhancements. They boast roomy cabins, seats that can be modified for personal comfort, and a suspension system designed for a gentle ride, ensuring that your health and comfort are at the forefront of every trip.",
    },{
      title: "Equipped for Care",
      img:amb3,
      desc:"Each vehicle is equipped with essential medical equipment, including oxygen, first aid supplies, and vital signs monitoring, ensuring that we are prepared for any needs that may arise during transit."
    },{
      title:"Professional Service",
      img:amb4,
      desc:"Our team of professional drivers and medical escorts are trained to provide not just a ride, but a comprehensive care experience. They are dedicated to making your trip as pleasant and stress-free as possible, offering assistance from door to door."
    },{
      title:"Your Partner in Health",
      img:amb5,
      desc:"At MiditTour , we're your partner in maintaining your health routine. Whether it's a hospital, doctor's office, or therapy session, we're here to get you there with care.we're more than just transportation;",
    }
  ];
  return (
    <div className="about" id="about">
      <div className="main-title">
        <h1>About MediRide</h1>
      </div>
      <div className="container">
        {data.map((box) => {
          return (
            <div className="box">
              <img src={box.img} alt="" />
              <div className="text-content">
                <h4>{box.title}</h4>
                <p>
                  {box.desc.length > 200
                    ? box.desc.slice(0, 180) + "..."
                    : box.desc}
                </p>
              </div>
              <div className="info">
                <a href="#">Read More</a>
                <ArrowForwardIcon />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CarAboutSec;
