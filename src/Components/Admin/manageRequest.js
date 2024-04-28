import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { deleteRequest, getFDescription, allRequests } from "../Services/Service";
import Footer from '../User/Footer'
import AdminNavbar from './adminnavbar'

async function getItemTitle(itemId)
  {
    const ItemDetails = await getFDescription(itemId);
    console.log("Description:"+ItemDetails.data);
    return ItemDetails.data;
  }

export default function ManageRequest() {
  const navigate = useNavigate();

  const [requestList, setRequestList] = useState([]);

  useEffect(() => {
    let id = localStorage.getItem("adminid");
    
    if (!id) {
      navigate("/adminlogin");
    }
    else {

      getAllRequests();
    }
  }, [navigate]);

  async function getAllRequests()
  {
    const request = await allRequests();
    setRequestList(request.data);
  }

  async function deleteRequestById(requestId)
    {
      try{
        await deleteRequest(requestId);
        toast.success("Donation delete successful");
        getAllRequests();

      }catch(err)
      {
        toast.error("Some error occured");
      }
    }

  return (
    <div>
      <ToastContainer />
      <AdminNavbar/>

      <h3 className='text-center my-3 mt-5'>All Requests</h3>
      <div className="container table-responsive mt-3">
        <table className="table table-hover table-striped">
          <thead>
            <tr>
              <th scope="col">Request ID</th>
              <th scope="col">NGO ID</th>
              <th scope="col">Donation ID</th>
              <th scope="col">Food Description</th>
              <th scope="col">Status</th>
            </tr>
          </thead>
          <tbody className="table-group-divider">
            {
              requestList.map(
                request =>

                  <tr key={request.id}>
                    <td>{request.requestId}</td>
                    <td>{request.ngoId}</td>
                    <td>{request.donationId}</td>
                    <td><FoodDescriptionLoader itemId={request.donationId}></FoodDescriptionLoader></td>
                    <td>{request.status}</td>    
                    <td><button className='btn btn-danger' onClick={() => deleteRequestById(request.requestId)} type="button">Delete</button></td>                
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

function FoodDescriptionLoader({itemId})
{
  const [itemTitle,setItemTitle] = useState('');

  useEffect(()=>{
    async function fetchItemTitle(){
      const title  = await getItemTitle(itemId);
      setItemTitle(title);
    }
    fetchItemTitle();
  },[itemId]);

  // return itemTitle ? itemTitle : 'Loading...';
  return itemTitle;
}
