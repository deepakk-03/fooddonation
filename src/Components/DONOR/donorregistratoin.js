import React, { useState } from "react";
import { useNavigate } from 'react-router-dom'
import { registerFoodDonation } from "../Services/Service";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DonorNavbar from "./donorNavbar";

export default function Donorregistration() {

  const navigate = useNavigate();

  const [foodDescription, setFoodDescription] = useState('');
  const [location, setLocation] = useState('');
  const [pickupDate, setPickupDate] = useState('');


  function handleFoodDescription(e) { setFoodDescription(e.target.value); }
  function handleLocation(e) { setLocation(e.target.value); }
  function handlePickupDate(e) { setPickupDate(e.target.value); }

  let id = localStorage.getItem("id");
  let name = localStorage.getItem("name");
  console.log(id);

  const saveFoodDonation = async (e) => {
    e.preventDefault();
    const FoodDonation = { foodDescription, location, pickupDate };
    registerFoodDonation(FoodDonation, id)
      .then(() => {
        toast.success('Food Donation created successfully');

        setTimeout(() => {
          navigate("/donorDashboard");
        }, [2000]);

      })
      .catch((error) => {
        toast.error('Failed to create Food Donation. Please try again.');
        console.error('Registration error:', error);
      });
  };

  return (
    <div>
      <DonorNavbar />
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
                    <h5>Food Donation Registration</h5>
                    <hr />
                    <h5>Hi, {name}</h5>
                    <hr />
                  </div>
                  <h2 className="fs-6 fw-normal text-center text-secondary mb-4">Enter your details to register</h2>
                  <form onSubmit={saveFoodDonation}>
                    <div className="row gy-2 overflow-hidden">
                      <div className="col-12">
                        <div className="form-floating mb-3">
                          <div class="form-group">
                            <textarea type="text" className="form-control" rows="5" name="foodDescription" id="foodDescription" value={foodDescription} onChange={handleFoodDescription} placeholder="Food Description" required={true} />
                          </div>
                        </div>
                      </div>

                      <div className="col-12">
                        <div className="form-floating mb-3">
                          <input type="date" className="form-control" name="pickupDate" id="pickupDate" value={pickupDate} onChange={handlePickupDate} placeholder="Pickup Date" required={true} />
                          <label htmlFor="pickupDate" className="form-label">Pickup Date</label>
                        </div>
                      </div>

                      <div className="col-12">
                        <div className="form-floating mb-3">
                          <input type="text" className="form-control" name="location" id="location" value={location} onChange={handleLocation} placeholder="Location" required={true} />
                          <label htmlFor="location" className="form-label">Location</label>
                        </div>
                      </div>

                      <div className="col-12">
                        <div className="d-grid my-3">
                          <button className="btn btn-success btn-lg" type="submit">Register</button>
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