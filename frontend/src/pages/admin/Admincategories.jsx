import React, { useEffect, useState } from "react";

const API = import.meta.env.VITE_API_URL;

const Admincategories = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [foodType, setFoodType] = useState("veg");
  const [editingId, setEditingId] = useState(null);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);

  const [image, setImage] = useState(null);

  // Fetch categories
  const getCategories = async () => {
    try {
      const res = await fetch(`${API}/api/categories`);
      const data = await res.json();
      setCategories(data);
      console.log(data)
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);


  const handleEdit = (cat) => {
    setEditingId(cat._id);
    setName(cat.name);
    setFoodType(cat.foodType);
    // setPreview(`${API}${cat.image}`);
    setPreview(cat.image);

  };


  const handleDelete = async (id) => {
    if (!window.confirm("Delete this category?")) return;

    try {
      await fetch(`${API}/api/categories/${id}`, {
        method: "DELETE",
      });

      getCategories();
    } catch (error) {
      console.log(error);
    }
  };


  // Add category (WITH IMAGE)
  //  const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   const formData = new FormData();
  //   formData.append("name", name);
  //   formData.append("foodType", foodType);

  //   if (image) {
  //     formData.append("image", image);
  //   }

  //   try {
  //     const url = editingId
  //       ? `${API}/api/categories/${editingId}`
  //       : `${API}/api/categories`;

  //     const method = editingId ? "PUT" : "POST";

  //     await fetch(url, {
  //       method,
  //       body: formData,
  //     });

  //     // reset form
  //     setName("");
  //     setFoodType("veg");
  //     setImage(null);
  //     setPreview("");
  //     setEditingId(null);

  //     getCategories();
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      let imageUrl = "";

      // If creating new category → image required
      if (!editingId && !image) {
        alert("Image is required");
        return;
      }

      // If new image selected → upload to Cloudinary
      if (image) {
        const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
        const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

        const formData = new FormData();
        formData.append("file", image);
        formData.append("upload_preset", uploadPreset);

        const cloudRes = await fetch(
          `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
          {
            method: "POST",
            body: formData,
          }
        );

        const cloudData = await cloudRes.json();

        if (!cloudData.secure_url) {
          alert("Image upload failed");
          return;
        }

        imageUrl = cloudData.secure_url;
      }

      // If editing and no new image → keep old preview
      if (editingId && !image) {
        imageUrl = preview;
      }

      const payload = {
        name,
        foodType,
        image: imageUrl,
      };

      console.log("Sending payload:", payload); // Debug

      const url = editingId
        ? `${API}/api/categories/${editingId}`
        : `${API}/api/categories`;

      const method = editingId ? "PUT" : "POST";

      await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      // reset
      setName("");
      setFoodType("veg");
      setImage(null);
      setPreview("");
      setEditingId(null);

      getCategories();

    } catch (error) {
      console.log(error);
    }
    finally {
      setLoading(false);
    }


  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      {/* Page Title */}
      <h1 className="text-3xl font-semibold mb-8">Category Manager</h1>

      {/* FORM CARD */}
      <div className="bg-white rounded-2xl shadow-sm p-6 mb-10 border">
        <h2 className="text-xl font-medium mb-4">
          {editingId ? "Edit Category" : "Add New Category"}
        </h2>

        <form
          onSubmit={handleSubmit}
          className="grid md:grid-cols-4 gap-4 items-end"
        >
          {/* NAME */}
          <div className="flex flex-col">
            <label className="text-sm text-gray-500 mb-1">Category Name</label>
            <input
              type="text"
              placeholder="e.g. Pizza"
              className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          {/* FOOD TYPE */}
          <div className="flex flex-col">
            <label className="text-sm text-gray-500 mb-1">Food Type</label>
            <select
              className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
              value={foodType}
              onChange={(e) => setFoodType(e.target.value)}
            >
              <option value="veg">Veg</option>
              <option value="nonveg">Non-Veg</option>
            </select>
          </div>

          {/* IMAGE */}
          <div className="flex flex-col">
            <label className="text-sm text-gray-500 mb-1">Upload Image</label>
            <input
              type="file"
              className="border rounded-lg px-3 py-2"
              onChange={(e) => {
                setImage(e.target.files[0]);
                setPreview(URL.createObjectURL(e.target.files[0]));
              }}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`rounded-lg px-6 py-2 h-[42px] transition flex items-center justify-center gap-2
    ${loading
                ? "bg-gray-400 cursor-not-allowed text-white"
                : "bg-black text-white hover:bg-gray-800"}
  `}
          >
            {loading && (
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
            )}

            {loading
              ? editingId
                ? "Updating..."
                : "Adding..."
              : editingId
                ? "Update"
                : "Add Category"}
          </button>
        </form>

        {/* IMAGE PREVIEW BOX */}
        {preview && (
          <div className="mt-6">
            <p className="text-sm text-gray-500 mb-2">Preview</p>
            <div className="w-32 h-32 border rounded-xl overflow-hidden">
              <img src={preview} className="w-full h-full object-cover" />
            </div>
          </div>
        )}
      </div>

      {/* CATEGORY TABLE */}
      <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">
        <div className="p-5 border-b font-medium text-lg">All Categories</div>

        {categories.length === 0 ? (
          <p className="p-6 text-gray-400">No categories created yet.</p>
        ) : (
          categories.map((cat) => (
            <div
              key={cat._id}
              className="grid grid-cols-12 items-center px-6 py-4 border-b hover:bg-gray-50 transition"
            >
              {/* IMAGE */}
              <div className="col-span-2">
                <img
                  src={cat.image}
                  className="w-16 h-16 object-cover rounded-lg"
                />
              </div>

              {/* NAME */}
              <div className="col-span-4 font-medium">{cat.name}</div>

              {/* TYPE */}
              <div className="col-span-3">
                <span
                  className={`px-3 py-1 rounded-full text-sm ${cat.foodType === "veg"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                    }`}
                >
                  {cat.foodType}
                </span>
              </div>

              {/* ACTIONS */}
              <div className="col-span-3 flex gap-3 justify-end">
                <button
                  onClick={() => handleEdit(cat)}
                  className="px-4 py-1 border rounded-lg hover:bg-black hover:text-white transition"
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(cat._id)}
                  className="px-4 py-1 border border-red-500 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );

};

export default Admincategories;
