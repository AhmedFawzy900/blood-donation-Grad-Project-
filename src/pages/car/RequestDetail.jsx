
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import CarRequestDetailInfo from '../../components/CarRequestDetailInfo';
import CarRequestDetailEditStatus from '../../components/CarRequestDetailEditStatus';
import Sidebar from '../../components/Sidebar';
import axios from 'axios'
import Spinner2 from '../../components/Spinner2';

const RequestDetail = () => {
  
    const id = useParams('id');
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);
    useEffect(() => {
      setTimeout(() => {
        setLoading(false);
      }, 1600);
    }, []);
    useEffect(() => {
       axios.get(`http://localhost:8000/api/car/get-request/${id.id}`).then(res => setData(res.data))
       .catch(err => console.log(err))
    },[id])
   if (data === null || id === null) {
       return <Spinner2/> 
   }

  if (loading) {
      return (
        <Spinner2 />
      );
    }
  return (
    <div className='d-flex'>
      <Sidebar/>
      <div className='w-100 p-2 mx-2'>
        <p className='detail-navigate'>Dashboard / Requests / {data.id}</p>
        <CarRequestDetailInfo data={data} />
        <CarRequestDetailEditStatus data={data} />
      </div>
    </div>
  )
}

export default RequestDetail
