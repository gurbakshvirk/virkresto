import axios from 'axios'; 




const API_URL = 'https://fakestoreapi.com/products'


// export const getAllProducts = async () => {
//   const response = await fetch(API_URL)
//   if (!response.ok) throw new Error('Failed to fetch All products')
//   return await response.json()
// }

export const getSingleProduct = async (id) => {
  const response = await fetch(`${API_URL}/${id}`)
  if (!response.ok) throw new Error('Failed to fetch single product')
  return await response.json()
}

const API = import.meta.env.VITE_API_URL;






// Fetch Products
 export const getAllProducts = async () => {
    try{
    const response = await axios.get(`${API}/api/products`);
return response.data;
    }
     catch (error) {
    console.error("Failed to fetch Products", error);
    return []; // return empty array on error to avoid breaking your component
  }
  };


//   // fetch popular products 
//   export const getPopularProducts = async () => {
//     try{
//       if(ispopular){ 
//         const response = await axios.get(`${API}/api/products`);
// return response.data;
//       }
//     }
//      catch (error) {
//     console.error("Failed to fetch Popular Products", error);
//     return []; 
//   }
//   };


// fetch popular products
export const getPopularProducts = async () => {
  try {
    const response = await axios.get(`${API}/api/products?popular=true`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch Popular Products", error);
    return [];
  }
};








// working

export const fetchCategories = async () => {
  try {
    const response = await axios.get(`${API}/api/categories`);
    return response.data; // Axios automatically parses JSON
  } catch (error) {
    console.error("Failed to fetch categories", error);
    return []; // return empty array on error to avoid breaking your component
  }
};
