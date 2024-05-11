import CarDashboardMainSec from "../../components/CarDashboardMainSec"
import Sidebar from "../../components/Sidebar"

const CarDashboard = () => {
    return (
        <div className="d-flex">
            <Sidebar />
            <CarDashboardMainSec />
        </div>
    )
}

export default CarDashboard