import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAdminByUsername, registerAdmin } from '../Services/Service';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from '../User/Footer';
import AdminNavbar from './adminnavbar';

export default function AddAdmin() {
  const navigator = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsername = (e) => setUsername(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  const saveAdmin = (e) => {
    e.preventDefault();
    const admin = { username, password };

    getAdminByUsername(username)
      .then((res) => {

        if (res.data.adminId) {
          toast.error('Admin Name already taken');
        } else {
          registerAdmin(admin)
            .then(() => {
              toast.success('User created successfully');
              setTimeout(() => {
                navigator("/adminlogin");
              }, 2000);
            })
            .catch((error) => {
              toast.error('Failed to create Admin. Please try again.');
              console.error('Signup error:', error);
            });
        }
      })
      .catch((error) => {
        toast.error('Failed to check Admin username availability. Please try again.');
        console.error('Admin username availability check error:', error);
      });
  };

  return (
    <div>
      <ToastContainer />
      <AdminNavbar />
      <section className="bg-light py-3 py-md-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-5 col-xxl-4">
              <div className="card border border-light-subtle rounded-3 shadow-sm">
                <div className="card-body p-3 p-md-4 p-xl-5">
                  <div className="text-center mb-3">
                    <h3>Food Donation Portal</h3>
                    <hr />
                    <h4>Admin Sign Up</h4>
                  </div>
                  <h2 className="fs-6 fw-normal text-center text-secondary mb-4">Enter Admin details to register</h2>
                  <form onSubmit={saveAdmin}>
                    <div className="row gy-2 overflow-hidden">
                      <div className="col-12">
                        <div className="form-floating mb-3">
                          <input type="text" className="form-control" name="userName" id="userName" value={username} onChange={handleUsername} placeholder="User Name" required={true} />
                          <label htmlFor="userName" className="form-label">User Name</label>
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="form-floating mb-3">
                          <input type="password" className="form-control" name="password" id="password" value={password} onChange={handlePassword} placeholder="Password" required={true} />
                          <label htmlFor="password" className="form-label">Password</label>
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="d-grid my-3">
                          <button className="btn btn-success btn-lg" type="submit">Sign up</button>
                        </div>
                      </div>
                      <div className="col-12">
                        <p className="m-0 text-secondary text-center">Already have an account? <Link to="/login" className="link-primary text-decoration-none">Sign in</Link></p>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
