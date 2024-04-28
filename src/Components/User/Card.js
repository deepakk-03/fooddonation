import React from 'react'

export default function Card(props) {
  return (
    <div>
      <div className="card bg-secondary text-white" style={{ width: "18rem" }}>
        <div className="card-body">
          <h6 className="card-subtitle mb-2 text-body-secondary ">{props.user_id}</h6>
          <h5 className="card-title">{props.foodDescription}</h5>
          <h6 className="card-subtitle mb-2 text-body-secondary">{props.location}</h6>
          <h6 className="card-subtitle mb-2 text-body-secondary">{props.pickupDate.slice(0, 10)}</h6>
          <p className="card-text">{props.status}</p>
          <button className="btn btn-warning" onClick={props.onRequest}>Request</button>
        </div>
      </div>
    </div>
  )
}
