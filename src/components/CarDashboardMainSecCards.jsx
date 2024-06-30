import totalImg from "../images/total.png";
import numImg from "../images/cars.png";
import timeImg from "../images/time.png";
import moneyImg from "../images/money.png";
import DshCard from "./DshCard";

const CarDashboardMainSecCards = () => {
    const adminData = JSON.parse(localStorage.getItem('Admin'));
    return(
        <div className="dashboard-cards">
            <h2>Welcome Back ,{adminData.name}</h2>
            <div className="cards">
                {/* card1 */}
                <DshCard img={totalImg} title="Total Booking" num="50"/>

                {/* card2 */}
                <DshCard img={numImg} title="Number Of Cars" num="20"/>

                {/* card3 */}   
                <DshCard img={timeImg} title="Pending Requests" num="50"/>

                {/* card4 */}
                <DshCard img={moneyImg} title="Revenue" num="10,000 k"/>
            </div>

        </div>
    )
}

export default CarDashboardMainSecCards