import HosMedicalInfo from "../components/HosMedicalInfo";
import Navbar from "../components/Navbar";
import UserMedicalInfo from "../components/UserMedicalInfo";

const UpdateMedicalInfo = () => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    return(
        <>
        <Navbar />
        {
            currentUser.type === "user" 
            ? 
            <UserMedicalInfo  /> 
            :
            <HosMedicalInfo />
        }
        </>
    )
}

export default UpdateMedicalInfo;