import React, { useEffect, useState } from 'react'
// import { toast, ToastContainer } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import { getFDescription, allRequests } from "../Services/Service"
import Footer from '../User/Footer'
import NgoNavbar from './ngoNavbar'
import { useNavigate } from 'react-router-dom';



async function getItemTitle(itemId) {
  const ItemDetails = await getFDescription(itemId);
  console.log("Description:" + ItemDetails.data);
  return ItemDetails.data;
}



export default function Raiserequest() {

  const navigate = useNavigate();
  const [user_id, setUser_id] = useState('');
  const [claimList, setClaimList] = useState([]);

  useEffect(() => {
    let id = localStorage.getItem("id");
    if (!id) {
      navigate("/login");
    }
    else {
      setUser_id(id);
    }
  }, [navigate]);

  useEffect(() => {
    if (user_id) {
      getallclaim(user_id);
    }
  }, [user_id]);


  async function getallclaim() {
    const datalist = await allRequests();

    console.log(datalist.data);
    setClaimList(datalist.data);

  }




  return (
    <div>
      <ToastContainer />
      <NgoNavbar />

      <h3 className='text-center my-3 mt-5'>All Items</h3>
      <div className="container table-responsive mt-3">
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th scope="col">Request ID</th>
              <th scope="col">NGO ID</th>
              <th scope="col">Donation ID</th>
              <th scope="col">Food Description</th>
              <th scope="col">Status</th>
              {/* <th scope="col">Actions</th> */}
            </tr>
          </thead>
          <tbody className="table-group-divider">
            {
              claimList.map(
                claim =>

                  <tr key={claim.ngoId}>
                    <td>{claim.requestId}</td>
                    <td>{claim.ngoId}</td>
                    <td>{claim.donationId}</td>
                    <td><FoodDescriptionLoader itemId={claim.donationId}></FoodDescriptionLoader></td>
                    <td>{claim.status}</td>

                    {/* <td><button className='btn btn-danger' onClick={()=>deleteClaimById(claim.Requestid)} type="button">Delete</button></td> */}
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

function FoodDescriptionLoader({ itemId }) {
  const [itemTitle, setItemTitle] = useState('');

  useEffect(() => {
    async function fetchItemTitle() {
      const title = await getItemTitle(itemId);
      setItemTitle(title);
    }
    fetchItemTitle();
  }, [itemId]);

  return itemTitle ? itemTitle : 'Loading...';

}

