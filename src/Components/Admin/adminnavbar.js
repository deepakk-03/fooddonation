import React from 'react'
import { Link } from 'react-router-dom'

export default function AdminNavbar() {

  function handlelogout(e) {
    localStorage.clear();
  }

  return (
    <div>
      <nav className="navbar navbar-dark bg-dark  navbar-expand-lg bg-body-tertiary ">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">Food Donation Portal</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
            <ul className="navbar-nav ">

              <li className="nav-item">
                <Link className="nav-link" to="/admindashboard">Home</Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="/manageAdmin">Admin</Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="/manageUsers">User</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/manageNgo">NGO</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/manageDonation">Food Donation</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/pendingRequest">Pending Requests</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/manageRequest">All Requests</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/addAdmin">Add Admin</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" onClick={handlelogout} to="/login">Logout</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  )
}