import axios from 'axios'; 






// export const getAllProducts = async () => {
//   const response = await fetch(API_URL)
//   if (!response.ok) throw new Error('Failed to fetch All products')
//   return await response.json()
// }






const API = import.meta.env.VITE_API_URL;

// fetch single product 
// fetch single product from YOUR backend
export const getSingleProduct = async (id) => {
  try {
    const response = await axios.get(`${API}/api/products/${id}`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch single product", error);
    return null;
  }
};

// exports.getSingleProduct = async (req, res) => {
//   try {
//     const product = await Product.findById(req.params.id)

//     if (!product) {
//       return res.status(404).json({ message: "Product not found" })
//     }

//     res.json(product)
//   } catch (error) {
//     res.status(500).json({ message: error.message })
//   }
// }








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
