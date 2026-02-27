import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import imageCompression from "browser-image-compression";
const Adminproducts = () => {
  const [categories, setCategories] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [previewImages, setPreviewImages] = useState([]);

  const [form, setForm] = useState({
    name: "",
    price: "",
    description: "",
    shortdescription: "",
    category: ""
  });
  const [images, setImages] = useState([]);
  const [products, setProducts] = useState([]);
  const [isVisible, setIsVisible] = useState(true);
  const [isPopular, setIsPopular] = useState(false);
  const [loading, setLoading] = useState(false);

  const API = import.meta.env.VITE_API_URL;

  // Fetch Categories
  const fetchCategories = async () => {
    const res = await axios.get(`${API}/api/categories`);
    setCategories(res.data);
  };

  // Fetch Products
  const fetchProducts = async () => {
    const res = await axios.get(`${API}/api/products`);
    setProducts(res.data);
  };


  useEffect(() => {
    axios.get(`${API}/api/products`).then(res => {
      console.log("PRODUCTS FROM API ", res.data);
      setProducts(res.data);
    });
  }, []);


  useEffect(() => {
    fetchCategories();
    fetchProducts();
  }, []);

  // Handle text input
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle image selection
  const handleImageChange = (e) => {
    setImages(e.target.files);

    const previews = Array.from(e.target.files).map(file =>
      URL.createObjectURL(file)
    );
    setPreviewImages(previews);
  };

  const handleEdit = (product) => {
    setEditingId(product._id);

    setForm({
      name: product.name,
      price: product.price,
      description: product.description,
      shortdescription: product.shortdescription,
      category: product.category?._id || product.category
    });

    // setPreviewImages(product.images.map(img => `${API}${img}`));
    setPreviewImages(
      product.images.map(img =>
        typeof img === "string" ? img : img.url
      )
    );

  };


  const handleDelete = async (id) => {
    if (!window.confirm("Delete this product?")) return;

    await axios.delete(`${API}/api/products/${id}`);
    fetchProducts();

  };


  const uploadImagesToCloudinary = async () => {

    const uploadPromises = Array.from(images).map(async (image) => {

      const compressedFile = await imageCompression(image, {
        maxSizeMB: 1,
        maxWidthOrHeight: 1280,
        useWebWorker: true,
      });

      const formData = new FormData();
      formData.append("file", compressedFile);
      formData.append(
        "upload_preset",
        import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET
      );

      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await res.json();
      return { url: data.secure_url };
    });

    return await Promise.all(uploadPromises);
  };

  // Submit Product
  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   try {
  //     let imageUrls = [];

  //     // Only upload if new images selected
  //     if (images.length > 0) {
  //       imageUrls = await uploadImagesToCloudinary();
  //     }

  //     const productData = {
  //       ...form,
  //       isVisible,
  //       isPopular,
  //       images: imageUrls.length > 0 ? imageUrls : previewImages.map(url => ({ url }))
  //     };

  //     if (editingId) {
  //       await axios.put(`${API}/api/products/${editingId}`, productData);
  //       toast.success("Product Updated successfully!");
  //     } else {
  //       await axios.post(`${API}/api/products`, productData);
  //       toast.success("Product Created successfully!");
  //     }

  //     // Reset
  //     setEditingId(null);
  //     setImages([]);
  //     setPreviewImages([]);
  //     setForm({
  //       name: "",
  //       price: "",
  //       description: "",
  //       shortdescription: "",
  //       category: "",
  //     });

  //     fetchProducts();

  //   } catch (error) {
  //     console.error(error);
  //     toast.error("Something went wrong");
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return;

    try {
      setLoading(true);

      let imageUrls = [];

      if (images.length > 0) {
        imageUrls = await uploadImagesToCloudinary();
      }

      const productData = {
        ...form,
        isVisible,
        isPopular,
        images: imageUrls,
      };

      if (editingId) {
        await axios.put(`${API}/api/products/${editingId}`, productData);
        toast.success("Product Updated successfully!");
      } else {
        await axios.post(`${API}/api/products`, productData);
        toast.success("Product Created successfully!");
      }

      // reset
      setEditingId(null);
      setImages([]);
      setPreviewImages([]);
      setForm({
        name: "",
        price: "",
        description: "",
        shortdescription: "",
        category: "",
      });

      fetchProducts();

    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      {/* PAGE TITLE */}
      <h1 className="text-3xl font-semibold mb-8">Product Manager</h1>

      {/* ADD PRODUCT CARD */}
      <div className="bg-white border rounded-2xl shadow-sm p-6 mb-10">
        <h2 className="text-xl font-medium mb-6">Add New Product</h2>

        <form
          onSubmit={handleSubmit}
          className="grid md:grid-cols-2 gap-6"
        >
          {/* LEFT SIDE */}
          <div className="space-y-4">
            <div>
              <label className="text-sm text-gray-500">Product Name</label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-2 mt-1 focus:ring-2 focus:ring-black"
                required
              />
            </div>

            <div>
              <label className="text-sm text-gray-500">Price</label>
              <input
                name="price"
                type="number"
                value={form.price}
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-2 mt-1 focus:ring-2 focus:ring-black"
                required
              />
            </div>

            <div>
              <label className="text-sm text-gray-500">Category</label>
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-2 mt-1 focus:ring-2 focus:ring-black"
                required
              >
                <option value="">Select Category</option>
                {categories.map(cat => (
                  <option key={cat._id} value={cat._id}>
                    {cat.name} ({cat.foodType})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-sm text-gray-500">Short Description</label>
              <input
                name="shortdescription"
                value={form.shortdescription}
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-2 mt-1"
              />
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="space-y-4">
            <div>
              <label className="text-sm text-gray-500">Full Description</label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                rows="5"
                className="w-full border rounded-lg px-4 py-2 mt-1"
              />
            </div>

            <div>
              <label className="text-sm text-gray-500">Upload Images</label>
              <input
                type="file"
                multiple
                onChange={handleImageChange}
                accept="image/*"
                className="w-full border rounded-lg px-3 py-2 mt-1"
                required={!editingId}
              />

            </div>
            <div className="flex items-center gap-6 mt-4">

              {/* Show / Hide */}
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={isVisible}
                  onChange={(e) => setIsVisible(e.target.checked)}
                />
                Show Product
              </label>

              {/* Popular */}
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={isPopular}
                  onChange={(e) => setIsPopular(e.target.checked)}
                />
                Mark as Popular
              </label>

            </div>

            {previewImages.length > 0 && (
              <div className="grid grid-cols-4 gap-4 mt-4">
                {previewImages.map((img, i) => (
                  <img key={i} src={img} className="h-24 w-full object-cover rounded" />
                ))}
              </div>
            )}


            <button
              disabled={loading}
              className={`py-3 rounded-lg transition w-full flex justify-center items-center gap-2
    ${loading ? "bg-gray-500 cursor-not-allowed" : "bg-black hover:bg-gray-800 text-white"}`}
            >
              {loading ? (
                <>
                  <span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></span>
                  Uploading...
                </>
              ) : (
                editingId ? "Update Product" : "Create Product"
              )}
            </button>
          </div>
        </form>

        {/* IMAGE PREVIEW GRID */}
        {/* {images.length > 0 && (
        <div className="mt-6">
          <p className="text-sm text-gray-500 mb-2">Image Preview</p>
          <div className="grid grid-cols-4 gap-4">
            {Array.from(images).map((img, i) => (
              <img
                key={i}
                src={URL.createObjectURL(img)}
                className="w-full h-24 object-cover rounded-lg border"
              />
            ))}
          </div>
        </div>
      )} */}
      </div>

      {/* PRODUCTS LIST */}
      <div className="bg-white border rounded-2xl shadow-sm overflow-hidden">
        <div className="p-5 border-b font-medium text-lg">
          All Products
        </div>

        {products.length === 0 ? (
          <p className="p-6 text-gray-400">No products added yet.</p>
        ) : (
          <div className="grid md:grid-cols-3 gap-6 p-6">
            {products.map(product => (
              <div
                key={product._id}
                className="border rounded-xl overflow-hidden hover:shadow-md transition"
              >
                {/* PRODUCT IMAGE */}
                {product.images?.length > 0 && (
                  <img
                    src={product.images[0]?.url}
                    className="w-full h-48 object-cover"
                  />
                )}

                {/* CONTENT */}
                <div className="p-4">
                  <h3 className="font-semibold text-lg">
                    {product.name}
                  </h3>

                  <p className="text-gray-500 text-sm mb-2">
                    {product.shortdescription}
                  </p>

                  <p className="font-bold text-xl mb-3">
                    ₹{product.price}
                  </p>


                  <span className="text-xs bg-gray-100 px-3 py-1 rounded-full">
                    {product.category?.name || "Category"}
                  </span>


                  <div className="flex gap-2 mt-4">
                    <button
                      onClick={() => handleEdit(product)}
                      className="bg-blue-500 text-white px-3 py-1 rounded"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(product._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded"
                    >
                      Delete
                    </button>
                  </div>

                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );

};

export default Adminproducts;
