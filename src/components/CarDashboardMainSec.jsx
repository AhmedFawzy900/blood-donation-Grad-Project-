import CarDashboardMainSecCards from "./CarDashboardMainSecCards"
import DoughnutChart from "./DoughnutChart"
import LineChart from "./LineChart"
import CustomizedTables from "./CustomizedTables"
import { useNavigate } from "react-router"

const CarDashboardMainSec = () => {
    const navigate = useNavigate();
    return (
    <div className="container">
        <CarDashboardMainSecCards />
        <div className="charts">
            <LineChart />
            <DoughnutChart />
        </div>
        <div className="customized-table">
            <h1>Latest Requests</h1>
            <CustomizedTables/>
            <button className="view-all" onClick={() => {navigate('/car/dashboard/requests')}}>View All</button>
        </div>
    </div>
    )
}

export default CarDashboardMainSec