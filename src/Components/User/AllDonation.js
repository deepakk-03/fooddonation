import React from 'react'

export default function getDonation(props) {
  return (
    <div>
      <div >
        <h6 className="card-subtitle mb-2 text-body-secondary ">{props.donation_id}</h6>
        <h5 className="card-title">{props.foodDescription}</h5>
        <h6 className="card-subtitle mb-2 text-body-secondary">{props.location}</h6>
        <h6 className="card-subtitle mb-2 text-body-secondary">{props.pickupDate.slice(0, 10)}</h6>
        <p className="card-text">{props.status}</p>
      </div>
    </div>
  )
}
