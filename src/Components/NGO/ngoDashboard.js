import React, { useState, useEffect } from 'react'
import Card from '../User/Card';
import Footer from '../User/Footer'
import NgoNavbar from './ngoNavbar'
import { unClaimedItemList, raiseServiceRequest, getNGOByUserId } from "../Services/Service";
import { useNavigate } from 'react-router-dom';
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from 'react-toastify';

export default function NgoDashboard() {
  const navigate = useNavigate();

  const [user_name, setUser_name] = useState(0);
  const [ngoId, setNgoId] = useState();

  useEffect(() => {

    setUser_name(localStorage.getItem("name"));
  }, []);

  useEffect(() => {
    let id = localStorage.getItem("id");
    if (!id) {
      navigate("/login");
    }
  }, [navigate]);
  
  let userIdforNGO = localStorage.getItem("userIdforNGO");
  console.log(userIdforNGO);


  useEffect(() => {

    getNGOByUserId(userIdforNGO).then((response) => {
      
      if(response.data){
        setNgoId(response.data.ngoId);
        console.log(ngoId);
      } else {
              toast.warn("Register your NGO First");
              navigate("/ngoregistration");
      }
    }).catch(error => {
      console.log(error);
    })
  }, [navigate, userIdforNGO, ngoId]);


  const [foodDonationRequest, setFoodDonationRequest] = useState([]);

  useEffect(() => {

    unClaimedItemList().then((response) => {
      console.log(response.data);
      setFoodDonationRequest(response.data);
    }).catch(error => {
      console.log(error);
    })
  }, []);

  async function handleClaimItem(donationId) {

    const datalist = await unClaimedItemList();
    console.log(datalist.data);
    setFoodDonationRequest(datalist.data);

    const request = {
      donationId,
      ngoId
    };

    raiseServiceRequest(ngoId, donationId, request)
      .then(() => {
        toast.success("Request Generated");
        setTimeout(() => {
          navigate("/raiserequest");

        }, 2000);
      })
      .catch((error) => {
        toast.error('Failed to create Request.');
        console.error("Registration error");
      })
  };


  return (
    <div>
      <ToastContainer />
      <NgoNavbar />
      <div className="col-6 pt-3">
        <h4>Welcome, {user_name}. Your NGO ID is {ngoId}.</h4>
      </div>
      <div className="container my-5 alert rounded bg-primary text-white" style={{ backgroundColor: '#9eeaf9' }}>
        <div className="row " >

          <div className="col-6">
            <h5>Total Unclaimed Food</h5>
          </div>
          <div className="col-6">
          </div>
        </div>
      </div>
      <div className="container ">
        <div className="row justify-content-left ">
          {
            foodDonationRequest.map(
              item =>
                <div className="col-lg-4 col-sm-12 col-md-6 my-3 " key={item.id}>
                  <Card key={item.donationId} user_id={item.userId} foodDescription={item.foodDescription} location={item.location} pickupDate={item.pickupDate} status={item.status} onRequest={() => handleClaimItem(item.donationId)} />
                </div>
            )
          }
        </div>
      </div>

      <Footer />
    </div>
  );
}