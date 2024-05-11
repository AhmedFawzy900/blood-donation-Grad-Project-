import React from 'react'
import Sidebar from '../../components/Sidebar'
import CustomizedTables from '../../components/CustomizedTables'

const CarDashboardRequests = () => {
  return (
    <div className='d-flex car-requests'>
      <Sidebar />
      <div className='all-requests'>
        <h1>All Requests</h1>
        <CustomizedTables allRequests={true} />
      </div>
    </div>
  )
}

export default CarDashboardRequests
