import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify'
import { allNgos, deleteNgo } from "../Services/Service";
import Footer from '../User/Footer'
import AdminNavbar from './adminnavbar'

export default function ManageNgo() {
  const navigate = useNavigate();

  const [ngoList, setNgoList] = useState([]);

  useEffect(() => {
    let id = localStorage.getItem("adminid");

    if (!id) {
      navigate("/adminlogin");
    }
    else {

      getAllNgos();
    }
  }, [navigate]);

  async function getAllNgos() {
    const ngo = await allNgos();
    setNgoList(ngo.data);
  }

  async function deleteNgoById(ngoId) {
    console.log("inside deleteuserbyid");
    try {
      await deleteNgo(ngoId);
      toast.success("NGO delete successful");
      getAllNgos();

    } catch (err) {
      toast.error("Some error occured");
    }
  }

  return (
    <div>
      <ToastContainer />
      <AdminNavbar />

      <h3 className='text-center my-3 mt-5'>All NGOs</h3>
      <div className="container table-responsive mt-3">
        <table className="table table-hover table-striped">
          <thead>
            <tr>
              <th scope="col">NGO ID</th>
              <th scope="col">User ID</th>
              <th scope="col">NGO Name</th>
              <th scope="col">NGO Description</th>
            </tr>
          </thead>
          <tbody className="table-group-divider">
            {
              ngoList.map(
                ngo =>

                  <tr key={ngo.id}>
                    <td>{ngo.ngoId}</td>
                    <td>{ngo.userId}</td>
                    <td>{ngo.ngoName}</td>
                    <td>{ngo.ngoDescription}</td>
                    <td><button className='btn btn-danger' onClick={() => deleteNgoById(ngo.ngoId)} type="button">Delete</button></td>
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
