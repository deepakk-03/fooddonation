import axios from 'axios';

const NGO_SERVICE_API_BASE_URL = "http://localhost:9070/ngos";
const FOOD_DONATION_SERVICE_API_BASE_URL = "http://localhost:9060/food-donations";
const SERVICE_REQUESTS_SERVICE_API_BASE_URL = "http://localhost:9080/service-requests";
const USER_SERVICE_API_BASE_URL = "http://localhost:9090/user";
const ADMIN_SERVICE_API_BASE_URL = "http://localhost:9050/admin";


// User Service
export const userSignup = (User) => {
    return axios.post(USER_SERVICE_API_BASE_URL + "/register", User);
}

export const usernameAvailable = (username) => {
    return axios.get(USER_SERVICE_API_BASE_URL + '/checkusername/' + username);
}
export const userloginfunc = (LoginData) => {
    console.log(LoginData);
    return axios.post(USER_SERVICE_API_BASE_URL + "/login", null, {
        params: {
            "username": LoginData.username,
            "password": LoginData.password
        }
    });
}

export const getUserById = (userId) => {
    return axios.get(USER_SERVICE_API_BASE_URL + '/user/' + userId);
}

export const allUsers = () => {
    return axios.get(USER_SERVICE_API_BASE_URL + '/allUsers');
}

// export const userLogin = (LoginData) => {
//     return axios.post(USER_SERVICE_API_BASE_URL + "/login", {params:{
//                 username:LoginData.email,
//                 password:LoginData.password
//             }});
// }

export const deleteUser = (userId) => {
    return axios.delete(USER_SERVICE_API_BASE_URL + '/' + userId);
}

// Service Requests Service
export const raiseServiceRequest = (ngoId, donationId, request) => {
    return axios.post(SERVICE_REQUESTS_SERVICE_API_BASE_URL + '/raise/' + ngoId + "/" + donationId, request);
}

export const pendingRequest = () => {
    return axios.get(SERVICE_REQUESTS_SERVICE_API_BASE_URL + "/pendingRequest");
}

export const allRequests = () => {
    return axios.get(SERVICE_REQUESTS_SERVICE_API_BASE_URL + '/all');
}

export const approveRequest = (requestId) => {
    return axios.put(SERVICE_REQUESTS_SERVICE_API_BASE_URL + '/approve/' + requestId);
}

export const rejectRequest = (requestId) => {
    return axios.put(SERVICE_REQUESTS_SERVICE_API_BASE_URL + '/reject/' + requestId);
}

export const deleteRequest = (requestId) => {
    return axios.delete(SERVICE_REQUESTS_SERVICE_API_BASE_URL + '/delete/' + requestId);
}

// NGO Service
export const registerNGO = (ngoId, userId) => {
    return axios.post(NGO_SERVICE_API_BASE_URL + '/register/' + userId, ngoId);
}

export const getNGOById = (ngoId) => {
    return axios.get(NGO_SERVICE_API_BASE_URL + '/' + ngoId);
}

export const allNgos = () => {
    return axios.get(NGO_SERVICE_API_BASE_URL + '/allNgos');
}

export const getNGOByName = (ngoName) => {
    return axios.get(NGO_SERVICE_API_BASE_URL + '/getNgo/' + ngoName);
}

export const getNGOByUserId = (userId) => {
    return axios.get(NGO_SERVICE_API_BASE_URL + '/getNgoBy/' + userId);
}

export const deleteNgo = (ngoId) => {
    return axios.delete(NGO_SERVICE_API_BASE_URL + '/' + ngoId);
}

// Food Donation Service
export const registerFoodDonation = (foodDonation, userId) => {
    return axios.post(FOOD_DONATION_SERVICE_API_BASE_URL + "/create/" + userId, foodDonation);
}

export const getFoodDonationById = (donationId) => {
    return axios.get(FOOD_DONATION_SERVICE_API_BASE_URL + '/' + donationId);
}

export const getFDescription = (donationId) => {
    return axios.get(FOOD_DONATION_SERVICE_API_BASE_URL + '/description/' + donationId);
}

export const changeStatus = (id, status) => {
    return axios.put(FOOD_DONATION_SERVICE_API_BASE_URL + '/changeStatus/' + id + '/' + status);
}

export const unClaimedItemList = () => {
    return axios.get(FOOD_DONATION_SERVICE_API_BASE_URL + '/unclaim');
}

export const getDonationById = (userId) => {
    return axios.get(FOOD_DONATION_SERVICE_API_BASE_URL + '/getDonationById/' + userId);
}

export const allDonations = () => {
    return axios.get(FOOD_DONATION_SERVICE_API_BASE_URL + '/all');
}

export const deleteDonation = (donationId) => {
    return axios.delete(FOOD_DONATION_SERVICE_API_BASE_URL + '/' + donationId);
}

// Admin Service
export const registerAdmin = (admin) => {
    return axios.post(ADMIN_SERVICE_API_BASE_URL + "/register", admin);
}

export const getAdminById = (adminId) => {
    return axios.get(ADMIN_SERVICE_API_BASE_URL + '/' + adminId);
}

export const getAdminByUsername = (username) => {
    return axios.get(ADMIN_SERVICE_API_BASE_URL + '/checkAdminUsername/' + username);
}

export const allAdmins = () => {
    return axios.get(ADMIN_SERVICE_API_BASE_URL + '/allAdmin');
}

export const deleteAdmin = (adminId) => {
    return axios.delete(ADMIN_SERVICE_API_BASE_URL + '/' + adminId);
}

export const authenticateAdmin = (LoginAdminData) => {
    console.log(LoginAdminData);
    return axios.post(ADMIN_SERVICE_API_BASE_URL + "/authenticate", null, {
        params: {
            "username": LoginAdminData.username,
            "password": LoginAdminData.password
        }
    });
}
