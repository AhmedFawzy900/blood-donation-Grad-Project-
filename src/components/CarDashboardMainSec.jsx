import CarDashboardMainSecCards from "./CarDashboardMainSecCards"
import DoughnutChart from "./DoughnutChart"
import LineChart from "./LineChart"
import CustomizedTables from "./CustomizedTables"
import { useNavigate } from "react-router"
import { useEffect, useState } from "react"
import axios from "axios"

const CarDashboardMainSec = () => {

    const navigate = useNavigate();
    const [requests, setRequests] = useState([]);
    const [deletedRequests , setDeletedRequests] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8000/api/car/get-requests')
        .then(res => setRequests(res.data))
        axios.get('http://localhost:8000/api/car/get-deleted-requests')
        .then(res => setDeletedRequests(res.data))
    },[])


    return (
    <div className="container">
        <CarDashboardMainSecCards />
        <div className="charts">
            <LineChart />
            <DoughnutChart requests={requests} deletedRequests={deletedRequests} />
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