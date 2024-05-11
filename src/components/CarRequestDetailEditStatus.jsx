import React from 'react'
import SendMsg from './SendMsg'

const CarRequestDetailEditStatus = ({data}) => {
  return (
    <div className="car-request-detail-edit-status">
      <h3>Contact With Customer</h3>
      <SendMsg data={data} />
    </div>
  )
}

export default CarRequestDetailEditStatus
