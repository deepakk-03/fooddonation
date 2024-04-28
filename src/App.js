import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './Components/SINGIN-SIGNUP/login';
import Signup from './Components/SINGIN-SIGNUP/Signup';

import HomePage from './Components/HOME/homePage';

import Adminlogin from './Components/Admin/adminlogin';
import ManageAdmin from './Components/Admin/manageAdmin';
import ManageUsers from './Components/Admin/manageUsers'
import AddAdmin from './Components/Admin/addAdmin'
import ManageNgo from './Components/Admin/manageNgo';

import Ngoregistration from './Components/NGO/ngoregistration'
import NgoDashboard from './Components/NGO/ngoDashboard';
import Raiserequest from './Components/NGO/raiserequest'

import ManageDonation from './Components/Admin/manageDonation';
import ManageRequest from './Components/Admin/manageRequest';
import PendingRequest from './Components/Admin/managePendingRequest';

import DashboardAdmin from './Components/Admin/admindashboard';
import DonorDashboard from './Components/DONOR/donorDashboard';
import Donorregistratoin from './Components/DONOR/donorregistratoin'

function App() {
  return (
    <div>
      <BrowserRouter>
      <Routes>
      
        {/* USER */}
        
      <Route path="/" element={<HomePage/>}></Route>
      <Route path="/homePage" element={<HomePage/>}></Route>
      <Route path="/login" element={<Login/>}></Route>
      <Route path="/signup" element={<Signup/>}></Route>
      <Route path="/raiserequest" element={<Raiserequest/>}></Route>
      <Route path="/ngoregistration" element={<Ngoregistration/>}></Route>
      <Route path="/donorregistratoin" element={<Donorregistratoin/>}></Route>

      {/* DASHBOARD */}
      <Route path="/admindashboard" element={<DashboardAdmin/>}></Route>
      <Route path="/ngoDashboard" element={<NgoDashboard/>}/>
      <Route path="/donorDashboard" element={<DonorDashboard/>}/>
      

      {/* ADMIN */}
      <Route path="/adminlogin" element={<Adminlogin/>}></Route>
      <Route path="/manageRequest" element={<ManageRequest/>}></Route>
      <Route path="/manageUsers" element={<ManageUsers/>}></Route>
      <Route path="/manageAdmin" element={<ManageAdmin/>}></Route>
      <Route path="/manageDonation" element={<ManageDonation/>}></Route>
      <Route path="/manageNgo" element={<ManageNgo/>}></Route>
      <Route path="/addAdmin" element={<AddAdmin/>}></Route>
      <Route path="/pendingRequest" element={<PendingRequest/>}></Route>
      </Routes>
      </BrowserRouter>
    </div>
    
  );
}

export default App;
