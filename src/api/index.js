import axiosInstance from "./axiosInstance";

// ---------- authentication -------------- //
export async function registerUser(formData) {
    try {
        const response = await axiosInstance.post("/auth/register", formData);
        return response?.data;
    } catch (error) {
        console.error('Error in api/index.js registerUser -->> ', error);
        throw error?.response;
    }
}

export async function loginUser(formData) {
    try {
        const response = await axiosInstance.post("/auth/login", formData);
        return response?.data;
    } catch (error) {
        console.error('Error in api/index.js loginUser -->> ', error);
        throw error?.response;
    }
}

export async function logoutUser() {
    try {
        const response = await axiosInstance.post("/auth/logout");
        return response?.data;
    } catch (error) {
        console.error('Error in api/index.js logoutUser -->> ', error);
        throw error?.response;
    }
}

export async function checkUserValid() {
    try {
        const response = await axiosInstance.get("/auth/user-valid");
        return response
    } catch (error) {
        console.error('Error in api/index.js checkUserValid -->> ', error);
        throw error?.response;
    }
}

// ---------- sender credentials ----------- //
export async function saveSenderCredentials(payload) {
    try {
        const response = await axiosInstance.post("/save-sender-credentials", payload);
        return response?.data;
    } catch (error) {
        console.error('Error in api/index.js saveSenderCredentials -->> ', error);
        throw error?.response;
    }
}

// ---------- list builder ----------------//
export async function uploadExcel(payload) {
    try {
        const response = await axiosInstance.post("/upload-excel", payload);
        return response?.data;
    } catch (error) {
        console.error('Error in api/index.js uploadExcel -->> ', error);   
        throw error?.response;        
    }
}

export async function getLists(page, limit, searchQuery) {
    try {
        // const response = await axiosInstance.get("/list-builder");
        const response = await axiosInstance.get(`/lists?page=${page}&limit=${limit}&searchQuery=${searchQuery}`);
        return response?.data;
    } catch (error) {
        console.error('Error in api/index.js getLists -->> ', error);   
        throw error?.response; 
    }
}

// ----------- template builder ------------//
export async function createEmailTemplate(payload) {
    try {
        const response = await axiosInstance.post("/email-template", payload);
        return response?.data;
    } catch (error) {
        console.error('Error in api/index.js createEmailTemplate -->> ', error);   
        throw error?.response;   
    }
}

export async function getEmailTemplates(page, limit, searchQuery) {
    try {
        const response = await axiosInstance.get(`/templates?page=${page}&limit=${limit}&searchQuery=${searchQuery}`);
        return response?.data;
    } catch (error) {
        console.error('Error in api/index.js getEmailTemplates -->> ', error);   
        throw error?.response; 
    }
}

// ------------- campaign sender ------------ //
export async function sendCampaign(payload) {
    try {
        const response = await axiosInstance.post("/send-campaign", payload);
        return response?.data;
    } catch (error) {
        console.error('Error in api/index.js sendCampaign -->> ', error);   
        throw error?.response; 
    }
}