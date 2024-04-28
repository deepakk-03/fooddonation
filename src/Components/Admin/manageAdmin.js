import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify'
import { allAdmins, deleteAdmin } from "../Services/Service";
import Footer from '../User/Footer'
import AdminNavbar from './adminnavbar'

export default function ManageAdmin() {
  const navigate = useNavigate();

  const [adminList, setAdminList] = useState([]);

  useEffect(() => {
    let id = localStorage.getItem("adminid");

    if (!id) {
      navigate("/adminlogin");
    }
    else {

      getAllAdmins();
    }
  }, [navigate]);

  async function getAllAdmins() {
    const admin = await allAdmins();
    setAdminList(admin.data);
  }

  async function deleteAdminById(adminId) {
    console.log("inside deleteuserbyid");
    try {
      await deleteAdmin(adminId);
      toast.success("Admin delete successful");
      getAllAdmins();

    } catch (err) {
      toast.error("Some error occured");
    }
  }

  return (
    <div>
      <ToastContainer />
      <AdminNavbar />

      <h3 className='text-center my-3 mt-5'>All Admins</h3>
      <div className="container table-responsive mt-3">
        <table className="table table-hover table-striped">
          <thead>
            <tr>
              <th scope="col">Admin ID</th>
              <th scope="col">Username</th>
            </tr>
          </thead>
          <tbody className="table-group-divider">
            {
              adminList.map(
                admin =>

                  <tr key={admin.id}>
                    <td>{admin.adminId}</td>
                    <td>{admin.username}</td>
                    <td><button className='btn btn-danger' onClick={() => deleteAdminById(admin.adminId)} type="button">Delete</button></td>
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
