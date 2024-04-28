import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { ToastContainer ,toast } from 'react-toastify'
import { allDonations, deleteDonation } from "../Services/Service";
import Footer from '../User/Footer'
import AdminNavbar from './adminnavbar'

export default function ManageDonation() {
  const navigate = useNavigate();

  const [donationList, setDonationList] = useState([]);

  useEffect(() => {
    let id = localStorage.getItem("adminid");
    
    if (!id) {
      navigate("/adminlogin");
    }
    else {

      getAllDonations();
    }
  }, [navigate]);

  async function getAllDonations()
  {
    const donation = await allDonations();
    setDonationList(donation.data);
  }

  async function deleteDonationById(donationId)
    {
        console.log("inside deleteuserbyid");
      try{
        await deleteDonation(donationId);
        toast.success("Donation delete successful");
        getAllDonations();

      }catch(err)
      {
        toast.error("Some error occured");
      }
    }

  return (
    <div>
      <ToastContainer />
      <AdminNavbar/>

      <h3 className='text-center my-3 mt-5'>All Donations</h3>
      <div className="container table-responsive mt-3">
        <table className="table table-hover table-striped">
          <thead>
            <tr>
              <th scope="col">Donation ID</th>
              <th scope="col">User ID</th>
              <th scope="col">Donation Description</th>
              <th scope="col">Location</th>
              <th scope="col">Pickup Date</th>
              <th scope="col">Status</th>
            </tr>
          </thead>
          <tbody className="table-group-divider">
            {
              donationList.map(
                donation =>

                  <tr key={donation.id}>
                    <td>{donation.donationId}</td>
                    <td>{donation.userId}</td>
                    <td>{donation.foodDescription}</td>
                    <td>{donation.location}</td>
                    <td>{donation.pickupDate}</td>
                    <td>{donation.status}</td>
                    <td><button className='btn btn-danger' onClick={() => deleteDonationById(donation.donationId)} type="button">Delete</button></td>
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
