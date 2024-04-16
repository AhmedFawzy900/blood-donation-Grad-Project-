import hosImg from '../images/hospital.png';
import userImg from '../images/user.png';
import bankImg from '../images/blood-bank.png';
import bloodImg from '../images/blood-donation.png';
import { useEffect, useState } from 'react';
const OurStatesSection = () => {
    const [users ,setUsers] = useState(0);
    const [hospitals ,setHospitals] = useState(0);
    const [banks,setBanks]=useState(0);
    const [process1 , setProcess1] = useState(0);
    const [process2 , setProcess2] = useState(0);
    const getAllStates = ()=>{
        // get the num of users 
        fetch('http://localhost:8000/api/get-users-personal-info')
        .then(res=>res.json())
        .then(res=>setUsers(res.length));

        // get the num of hospitals 
        fetch('http://localhost:8000/api/get-hospitals-personal-info')
        .then(res=>res.json())
        .then(res=>setHospitals(res.filter(item=>item.type == "hospital").length));
        
        // get the num of blood banks 
        fetch('http://localhost:8000/api/get-hospitals-personal-info')
        .then(res=>res.json())
        .then(res=>setBanks(res.filter(item=>item.type == "blood_bank").length));
        // get the num of successful donations = num of donate requests + num of blood reqests 
        fetch('http://localhost:8000/api/get-requests')
        .then(res=>res.json())
        .then(res=>setProcess1(res.filter(item=>item.status == "done").length));
        fetch('http://localhost:8000/api/get-donate-requests')
        .then(res=>res.json())
        .then(res=>setProcess2(res.filter(item=>item.status == "done").length));

    }
    useEffect(()=>{
        getAllStates();
    },[])
    return (
        <div class="stats" id="stats">
          <h2>Our Awsome Stats</h2>
          <div class="container">
              <div class="box">
                  <img src={hosImg} alt="" />
                  <span class="number" data-goal="150">{hospitals}</span>
                  <span class="text">Hospital</span>
              </div>
              <div class="box">
                  <img src={userImg} alt="" />
                  <span class="number" data-goal="135">{users}</span>
                  <span class="text">Person</span>
              </div>
              <div class="box">
                  <img src={bankImg} alt="" />
                  <span class="number" data-goal="50">{banks}</span>
                  <span class="text">Blood Bank</span>
              </div>
              <div class="box">
                  <img src={bloodImg} alt="" />
                  <span class="number" data-goal="500">{process1+process2}</span>
                  <span class="text">Donation Process</span>
              </div>
          </div>
        </div>
    )
}
export default OurStatesSection