import { useEffect } from "react";
import { BrowserRouter, Link, useNavigate } from "react-router-dom";
import Register from "./user/Register";
import HosRegister from "./hospital/HosRegister";
import logo from '../images/logo.png';
import waves from '../images/waves.svg';
export default function ChoosePath(){
    const navigate = useNavigate();
    useEffect(()=>{
        navigate();
    },[]);
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser) {
        navigate('/home');
    }
return (
        <div className="choosePath choosePath-page">
            <div className="content col-lg-5 col-md-7 col-sm-12 col-xs-12">
                <img src={logo} className="logo" alt="logo" />
                <div className="links">
                    <Link className="login-btn" to="/login">Login</Link>
                    <Link to="/user/register">Create Account As User</Link>
                    <Link to="/hospital/hosRegister">Create Account As Hospital Or Bank</Link>
                </div>

                <img src={waves} alt="waves" className="waves" />
            </div>
        </div> 
    );
}