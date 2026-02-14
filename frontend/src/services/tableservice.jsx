import axios from "axios";


const API = import.meta.env.VITE_API_URL;


// Fetch all tables 
export const getAllTables = async()=>{
    try{

        const response = await axios.get(`${API}/api/tables`);
        return response.data;
    }catch (error) {
    console.error("Failed to fetch Tables", error);
    return [];
    }
}


// fetch single table 
export const getSingleTable = async(id)=>{
    try{
        const response = await axios.get(`${API}/api/tables/${id}`);

        return response.data;
    }
    catch(error){
    console.error("Failed to fetch table", error);

    }
}

//create table
export const createTable = async(data)=>{
    try{
        const response = await axios.post(`${API}/api/tables`, data);
        return response.data;
    }
    catch(error){
    console.error("Failed to Create table", error);
    }
}

// delete table
export const deleteTable = async(id)=>{
    try{
        const response = await axios.delete(`${API}/api/tables/${id}`,);
        return response.data;
    }
    catch(error){
    console.error("Failed to Delete table", error);
    }
}

// update table
export const updateTable = async(id, data)=>{
  try{
    const response = await axios.put(`${API}/api/tables/${id}`, data);
    return response.data;
  }catch(error){
    console.error("Failed to Update table", error);
  }
}


