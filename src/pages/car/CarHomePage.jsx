import { useEffect, useState } from "react"
import CarAboutSec from "../../components/CarAboutSec"
import CarContactSec from "../../components/CarContactSec"
import CarFooter from "../../components/CarFooter"
import CarGallarySec from "../../components/CarGallarySec"
import CarNavbar from "../../components/CarNavbar"
import CarServicesSec from "../../components/CarServicesSec"
import CarWelcomeSec from "../../components/CarWelcomeSec"
import Spinner from "../../components/Spinner"
import ToTopButton from "../../components/ToTopButton"

const CarHomePage = () => {
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        setTimeout(() => {
          setLoading(false);
        }, 3000);
      }, []);

    if (loading) {
        return (
          <Spinner />
        );
      }
    return(
        <>
            <CarNavbar />
            <CarWelcomeSec />
            <CarAboutSec />
            <div className="spikes"></div>
            <CarGallarySec />
            <CarServicesSec />
            <CarContactSec />
            <CarFooter />
            <ToTopButton />
        </>
    )
}

export default CarHomePage