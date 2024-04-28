import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { ToastContainer ,toast } from 'react-toastify'
import { approveRequest, pendingRequest, rejectRequest } from "../Services/Service";
import Footer from '../User/Footer'
import AdminNavbar from './adminnavbar'

export default function PendingRequest() {
  const navigate = useNavigate();

  const [requestList, setRequestList] = useState([]);

  useEffect(() => {
    let id = localStorage.getItem("adminid");
    
    if (!id) {
      navigate("/adminlogin");
    }
    else {

      getpendingRequest();
    }
  }, [navigate]);

  async function getpendingRequest()
  {
    const request = await pendingRequest();
    setRequestList(request.data);
  }

  async function rejectRequestById(requestId)
    {
        console.log("inside rejectuserbyid");
      try{
        await rejectRequest(requestId);
        toast.success("Request Rejected successful");

        getpendingRequest();

      }catch(err)
      {
        toast.error("Some error occured");
      }
    }

    async function approveRequestById(requestId)
    {
        console.log("inside approveRequestById");
      try{
        await approveRequest(requestId);
        toast.success("Request Approved successful");

        getpendingRequest();

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
              <th scope="col">Status</th>
              <th scope="col">Donation ID</th>
            </tr>
          </thead>
          <tbody className="table-group-divider">
            {
              requestList.map(
                request =>

                  <tr key={request.id}>
                    <td>{request.requestId}</td>
                    <td>{request.ngoId}</td>
                    <td>{request.status}</td>                    
                    <td>{request.donationId}</td>
                    <td><button className='btn btn-success' onClick={() => approveRequestById(request.requestId)} type="button">Approve</button></td>
                    <td><button className='btn btn-warning' onClick={() => rejectRequestById(request.requestId)} type="button">Reject</button></td>
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
