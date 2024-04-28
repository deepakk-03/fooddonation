import React, { useState } from "react";
import { useNavigate } from 'react-router-dom'
import { registerNGO, getNGOByName } from "../Services/Service";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NgoNavbar from "./ngoNavbar";

export default function Ngoregistration() {

  const navigator = useNavigate();

  const [ngoName, setNgoName] = useState('');
  const [ngoDescription, setNgoDescription] = useState('');

  function handleNgoName(e) { setNgoName(e.target.value); }
  function handleNgoDescription(e) { setNgoDescription(e.target.value); }

  let id = localStorage.getItem("id");
  let name = localStorage.getItem("name");

  const saveNgo = (e) => {
    e.preventDefault();
    const NGO = { ngoName, ngoDescription };

    getNGOByName(ngoName)
      .then((res) => {

        if (res.data.ngoId) {
          toast.error('NGO Name already taken');
        } else {
          registerNGO(NGO, id)
            .then((res) => {
              toast.success('NGO created successfully');
              localStorage.setItem("ngoId", res.data.ngoId);
              setTimeout(() => {
                navigator("/ngoDashboard");
              }, 2000);
            })
            .catch((error) => {
              // toast.error('Failed to create NGO. Please try again.');
              console.error('Registration error:', error);
            });
        }
      })
      .catch((error) => {
        toast.error('Failed to check NGO name availability. Please try again.');
        console.error('Ngo name availability check error:', error);
      });
  };

  return (
    <div>
      <NgoNavbar />
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
                    <h5>NGO Registration</h5>
                    <hr />
                    <h5>Hi, {name}</h5>
                    <hr />
                  </div>
                  <h2 className="fs-6 fw-normal text-center text-secondary mb-4">Enter your details to register</h2>
                  <form onSubmit={saveNgo}>
                    <div className="row gy-2 overflow-hidden">
                      <div className="col-12">
                        <div className="form-floating mb-3">
                          <input type="text" className="form-control" name="ngoName" id="ngoName" value={ngoName} onChange={handleNgoName} placeholder="NGO Name" required={true} />
                          <label htmlFor="ngoName" className="form-label">NGO Name</label>
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="form-floating mb-3">
                          <div className="form-group">
                            <textarea type="text" className="form-control" rows="5" name="ngoDescription" id="ngoDescription" value={ngoDescription} onChange={handleNgoDescription} placeholder="NGO Description" required={true} />
                          </div>
                        </div>
                      </div>

                      <div className="col-12">
                        <div className="d-grid my-3">
                          <button className="btn btn-success btn-lg " type="submit">Register</button>
                        </div>
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