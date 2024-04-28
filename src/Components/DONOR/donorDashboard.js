import React, { useState, useEffect } from 'react'
import Footer from '../User/Footer'
import DonorNavbar from './donorNavbar';
import { getDonationById } from "../Services/Service";
import { useNavigate } from 'react-router-dom';
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from 'react-toastify';

export default function DonorDashboard() {
  const navigate = useNavigate();

  const [user_name, setUser_name] = useState(0);


  useEffect(() => {

    setUser_name(localStorage.getItem("name"));
  }, []);

  useEffect(() => {
    let id = localStorage.getItem("id");
    if (!id) {
      navigate("/login");
    }
  }, [navigate]);

  const [foodDonationRequest, setFoodDonationRequest] = useState([]);
  let userId = localStorage.getItem("id");

  useEffect(() => {
    console.log(userId);
    getDonationById(userId).then((response) => {
      console.log(response.data);
      setFoodDonationRequest(response.data);

    }).catch(error => {
      console.log(error);
    })
  }, [userId]);


  return (
    <div>
      <ToastContainer />
      <DonorNavbar />
      <div className="col-6 pt-3 ">
        <h4>Welcome, {user_name}</h4>
      </div>
      <div className="container my-5 alert rounded bg-primary text-white" style={{ backgroundColor: '#9eeaf9', textAlign: 'center' }}>
        <div className="row " >

          <div>
            <h2>from your Heart</h2>
            <h3>to their Plate</h3>
          </div>

          <div className="col-6">
          </div>
        </div>
      </div>

      <div className="container my-5 alert rounded   alert alert-warning text-black" style={{ textAlign: 'center' }}>
        <div className="row " >

          <div>
            <h2>You make a difference</h2>
          </div>

          <div className="col-6">
          </div>
        </div>
      </div>

      <h3 className='text-center my-3 mt-5'>Donations made by you:</h3>
      <div className="container table-responsive mt-3">
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th scope="col">Donation Id</th>
              <th scope="col">Food Description</th>
              <th scope="col">Location</th>
              <th scope="col">Pickup Date</th>
              <th scope="col">Status</th>
            </tr>
          </thead>
          <tbody className="table-group-divider">
            {
              foodDonationRequest.map(
                claim =>

                  <tr key={claim.donationId}>
                    <td>{claim.donationId}</td>
                    <td>{claim.foodDescription}</td>
                    <td>{claim.location}</td>
                    <td>{claim.pickupDate.slice(0, 10)}</td>
                    <td>{claim.status}</td>

                  </tr>
              )
            }
          </tbody>
        </table>
      </div>
      <Footer />
    </div>
  )
}




