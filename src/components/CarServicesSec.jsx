import trans from '../images/trans.png';
import trans1 from '../images/trans1.png';
import trans2 from '../images/trans2.png';
import trans3 from '../images/trans3.png';
import trans4 from '../images/trans4.png';
import trans5 from '../images/trans5.png';
import trans6 from '../images/24-hours-support.png';
const CarServicesSec = () => {
    const data = [
      {
        title: "PATIENT TRANSPORTATION",
        img: trans1,
      },{
        title: "Long-Distance Travel",
        img: trans3,
      },{
        title:"One-Time Appointments"
        ,img:trans2
      },{
        title:"Interfacility Transfers",
        img:trans5
      },{
        title:"Quick Booking System",
        img:trans4
      },{
        title:"24/7 Customer Support",
        img:trans6
      }
    ]
  return (
    <div className="services" id="services">
        <div className="dots dots-up"></div>
        <div className="dots dots-down"></div>
      <div className="main-title">
        <h1>Our Services</h1>
      </div>
      <div className="container">
        {data.map((box,index) => (  
            <div className="box" key={index}>
            <img src={box.img} alt="" />
            <h3>{box.title}</h3>
            <div className="info">
                <a href="#">Details</a>
            </div>
            </div>
        ))}
      </div>
    </div>
  );
};
export default CarServicesSec;
