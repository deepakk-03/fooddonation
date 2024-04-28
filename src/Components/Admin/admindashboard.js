import React, { useState, useEffect } from 'react'
import AdminNavbar from './adminnavbar'
import { ToastContainer } from 'react-toastify'
import { Link, useNavigate } from 'react-router-dom'
import Footer from '../User/Footer'


export default function DashboardAdmin() {

    const navigate = useNavigate();
    const [username, setUsername] = useState('');

    useEffect(() => {
        let id = localStorage.getItem("adminid");
        let uname = localStorage.getItem("username");
        if (!id) {
            navigate("/adminlogin");
        }
        else {
            //setAdminid(id);
            setUsername(uname);
        }
    }, [navigate]);


    return (
        <div>
            <ToastContainer />
            <AdminNavbar />
            <div className="col-12 py-3 ">
                <h4>Admin Dashboard</h4>
                <div className="col-6 py-3"><h5>Welcome , {username}</h5></div>
            </div>
            <div className="container py-3">
                <div className="row ">
                    <div className="col-lg-4 col-sm-12 col-md-6 my-3 ">

                        <div className="card justify-content-center bg-secondary text-white" style={{ width: "18rem" }}>
                            <div className="card-body">
                                <h5 className="card-title">Manage All Request</h5>
                                <p className="card-text">Manage all the Request made by NGO.</p>
                                <Link to="/manageRequest" className="btn btn-warning">Manage</Link>
                            </div>
                        </div>

                    </div>

                    <div className="col-lg-4 col-sm-12 col-md-6 my-3">

                        <div className="bg-secondary text-white card" style={{ width: "18rem" }}>
                            <div className="card-body">
                                <h5 className="card-title">Pending Request</h5>
                                <p className="card-text">Shows all the Pending Request</p>
                                <Link to="/pendingRequest" className="btn btn-warning">Manage</Link>
                            </div>
                        </div>

                    </div>

                    <div className="col-lg-4 col-sm-12 col-md-6 my-3">

                        <div className="bg-secondary text-white card" style={{ width: "18rem" }}>
                            <div className="card-body">
                                <h5 className="card-title">Manage NGO</h5>
                                <p className="card-text">NGO Details</p>
                                <Link to="/manageNgo" className="btn btn-warning">Manage</Link>
                            </div>
                        </div>

                    </div>

                    <div className="col-lg-4 col-sm-12 col-md-6 my-3">

                        <div className="bg-secondary text-white card" style={{ width: "18rem" }}>
                            <div className="card-body">
                                <h5 className="card-title">Manage Donations</h5>
                                <p className="card-text">Donation Details</p>
                                <Link to="/manageDonation" className="btn btn-warning">Manage</Link>
                            </div>
                        </div>

                    </div>

                    <div className="col-lg-4 col-sm-12 col-md-6 my-3">

                        <div className="bg-secondary text-white card" style={{ width: "18rem" }}>
                            <div className="card-body">
                                <h5 className="card-title">Manage Admin</h5>
                                <p className="card-text">Admin Details</p>
                                <Link to="/manageAdmin" className="btn btn-warning">Manage</Link>
                            </div>
                        </div>

                    </div>

                    <div className="col-lg-4 col-sm-12 col-md-6 my-3">

                        <div className="bg-secondary text-white card" style={{ width: "18rem" }}>
                            <div className="card-body">
                                <h5 className="card-title">Manage Users</h5>
                                <p className="card-text">User Details</p>
                                <Link to="/manageUsers" className="btn btn-warning">Manage</Link>
                            </div>
                        </div>

                    </div>

                    <div className="col-lg-4 col-sm-12 col-md-6 my-3">

                        <div className="bg-secondary text-white card" style={{ width: "18rem" }}>
                            <div className="card-body">
                                <h5 className="card-title">Add Admin</h5>
                                <p className="card-text">Create new Admin</p>
                                <Link to="/addAdmin" className="btn btn-warning">Add</Link>
                            </div>
                        </div>

                    </div>

                </div>

            </div>
            <Footer />

        </div>
    )
}
