import CarAboutSec from "../../components/CarAboutSec"
import CarFooter from "../../components/CarFooter"
import CarGallarySec from "../../components/CarGallarySec"
import CarNavbar from "../../components/CarNavbar"
import CarServicesSec from "../../components/CarServicesSec"
import CarWelcomeSec from "../../components/CarWelcomeSec"
import ToTopButton from "../../components/ToTopButton"

const CarHomePage = () => {
    return(
        <>
            <CarNavbar />
            <CarWelcomeSec />
            <CarAboutSec />
            <div class="spikes"></div>
            <CarGallarySec />
            <CarServicesSec />
            <CarFooter />
            <ToTopButton />
        </>
    )
}

export default CarHomePage