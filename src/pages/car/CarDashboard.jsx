import { useEffect, useState } from "react";
import CarDashboardMainSec from "../../components/CarDashboardMainSec"
import Sidebar from "../../components/Sidebar"
import Spinner2 from "../../components/Spinner2";
import { useNavigate } from "react-router";

const CarDashboard = () => {
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const adminData = JSON.parse(localStorage.getItem('Admin'));
    useEffect(() => {
        setTimeout(() => {
          setLoading(false);
        }, 1600);
        if (!adminData) {
         navigate('/car/dashboard/login');
        }
      }, []);
    if (loading) {
        return (
          <Spinner2 />
        );
      }
     
    return (
        <div className="d-flex">
            <Sidebar />
            <CarDashboardMainSec />
        </div>
    )
}

export default CarDashboard