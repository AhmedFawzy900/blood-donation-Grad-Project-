
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import CarRequestDetailInfo from '../../components/CarRequestDetailInfo';
import CarRequestDetailEditStatus from '../../components/CarRequestDetailEditStatus';
import Sidebar from '../../components/Sidebar';
import axios from 'axios'

const RequestDetail = () => {
    const id = useParams('id');
    const [data, setData] = useState({})
    useEffect(() => {
       axios.get(`http://localhost:8000/api/car/get-request/${id.id}`).then(res => setData(res.data))
       .catch(err => console.log(err))
    },[id])
   if (data === null || id === null) {
       return <div>loading</div>
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
