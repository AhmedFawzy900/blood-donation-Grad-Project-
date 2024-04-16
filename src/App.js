import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router';
import Register from './pages/user/Register';
import MedicalInfo from './pages/user/MedicalInfo';
import Home from './pages/Home';
import ChoosePath from './pages/ChoosePath';
import HosRegister from './pages/hospital/HosRegister';
import HosInfo from './pages/hospital/HosInfo';
import Login from './pages/Login';
import DistanceCalculator from './pages/DistanceCalculator';
import RequestBlood from './pages/RequestBlood';
import Profile from './pages/Profile';
import Requests from './pages/Requests';
import Donate from './pages/Donate';
import UpdateMedicalInfo from './pages/UpdateMedicalInfo';

function App() {
  return (
    <div className="App">
       <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<ChoosePath />} />
        <Route path="/login" element={<Login />} />
        <Route path="/user/register" element={<Register />} />
        <Route path="/user/medicalInfo" element={<MedicalInfo />} />
        <Route path="/hospital/hosRegister" element={<HosRegister />} />
        <Route path="/hospital/hosInfo" element={<HosInfo />} />
        <Route path="/bloodRequst" element={<RequestBlood />} />
        <Route path='/profile' element={<Profile/>} />
        <Route path='/requests' element={<Requests/>} />
        <Route path='/donate' element={<Donate/>} />
        <Route path='/updateMedicalInfo' element={<UpdateMedicalInfo/>} />
      </Routes>
    </div>
  );
}

export default App;
