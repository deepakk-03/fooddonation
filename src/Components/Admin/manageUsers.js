import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify'
import { allUsers, deleteUser } from "../Services/Service";
import Footer from '../User/Footer'
import AdminNavbar from './adminnavbar'

export default function ManageUsers() {
  const navigate = useNavigate();

  const [userList, setUserList] = useState([]);

  useEffect(() => {
    let id = localStorage.getItem("adminid");

    if (!id) {
      navigate("/adminlogin");
    }
    else {

      getAllUsers();
    }
  }, [navigate]);

  async function getAllUsers() {
    const users = await allUsers();
    setUserList(users.data);
  }

  async function deleteUserById(userId) {
    console.log("inside deleteuserbyid");
    try {
      await deleteUser(userId);
      toast.success("User delete successful");
      getAllUsers();

    } catch (err) {
      toast.error("Some error occured");
    }
  }

  return (
    <div>
      <ToastContainer />
      <AdminNavbar />

      <h3 className='text-center my-3 mt-5'>All Users</h3>
      <div className="container table-responsive mt-3">
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th scope="col">User ID</th>
              <th scope="col">Username</th>
              <th scope="col">Mobile Number</th>
              <th scope="col">User Type</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody className="table-group-divider">
            {
              userList.map(
                user =>

                  <tr key={user.id}>
                    <td>{user.userId}</td>
                    <td>{user.username}</td>
                    <td>{user.mobile}</td>
                    <td>{user.userType}</td>
                    <td><button className='btn btn-danger' onClick={() => deleteUserById(user.userId)} type="button">Delete</button></td>
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
