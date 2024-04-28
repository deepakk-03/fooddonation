import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { usernameAvailable, userSignup } from '../Services/Service';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoginNav from './logInNav'

export default function Signup() {
  const navigator = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [userType, setUserType] = useState('');

  const handleUsername = (e) => setUsername(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const handleMobileNumber = (e) => setMobileNumber(e.target.value);
  const handleUserType = (e) => setUserType(e.target.value);

  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(email);
  };


  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    return passwordRegex.test(password);
  };

  const validateMobileNumber = (number) => {
    const mobileRegex = /^[6789]\d{9}$/;
    return mobileRegex.test(number);
  };

  const saveUser = (e) => {
    e.preventDefault();
    const user = { username, password, mobileNumber, userType };
    if (!validateEmail(username)) {
      toast.error('Please enter a valid email address as the username.');
      return;
    }

    if (!validatePassword(password)) {
      toast.error('Password must be strong (at least 8 characters, with uppercase, lowercase, and digits).');
      return;
    }

    if (!validateMobileNumber(mobileNumber)) {
      toast.error('Mobile number must start with 9, 8, 7, or 6 and have 10 digits.');
      return;
    }


    usernameAvailable(username)
      .then((res) => {

        if (res.data.userId) {
          toast.error('Username already taken');
        } else {
          userSignup(user)
            .then(() => {
              toast.success('User created successfully');
              setTimeout(() => {
                navigator("/login");
              }, 2000);
            })
            .catch((error) => {
              toast.error('Failed to create user. Please try again.');
              console.error('Signup error:', error);
            });
        }
      })
      .catch((error) => {
        toast.error('Failed to check username availability. Please try again.');
        console.error('Username availability check error:', error);
      });
  };

  return (
    <div>
      <LoginNav />
      <ToastContainer />
      <section className="bg-light py-3 py-md-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-5 col-xxl-4">
              <div className="card border border-light-subtle rounded-3 shadow-sm">
                <div className="card-body p-3 p-md-4 p-xl-5">
                  <div className="text-center mb-3">
                    <h3>Food Donation Portal</h3>
                    <hr />
                    <h4>Sign Up</h4>
                  </div>
                  <h2 className="fs-6 fw-normal text-center text-secondary mb-4">Enter your details to register</h2>
                  <form onSubmit={saveUser}>
                    <div className="row gy-2 overflow-hidden">
                      <div className="col-12">
                        <div className="form-floating mb-3">
                          <input type="text" className="form-control" name="userName" id="userName" value={username} onChange={handleUsername} placeholder="User Name" required={true} />
                          <label htmlFor="userName" className="form-label">Email Address</label>
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="form-floating mb-3">
                          <input type="password" className="form-control" name="password" id="password" value={password} onChange={handlePassword} placeholder="Password" required={true} />
                          <label htmlFor="password" className="form-label">Password</label>
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="form-floating mb-3">
                          <input type="text" className="form-control" name="mobileNumber" id="mobileNumber" value={mobileNumber} onChange={handleMobileNumber} placeholder="Mobile Number" required={true} />
                          <label htmlFor="mobileNumber" className="form-label">Mobile Number</label>
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="form-floating mb-3">
                          <select type="text" className="form-select" name="userType" id="userType" value={userType}
                            onChange={handleUserType} placeholder="User Type" required={true}>
                            <option selected>User Type</option>
                            <option value="DONOR">DONOR</option>
                            <option value="NGO">NGO</option>
                          </select>

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
    </div>
  );
}
