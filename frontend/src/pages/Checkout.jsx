import React, { useContext, useState, useEffect } from 'react'
import { CartContext } from '../context/CartContext'
import { useNavigate } from 'react-router-dom'
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(""); // replace with your Stripe key
// `${import.meta.env.STRIPEKEY}

const Checkout = () => {

    const { cart, clearCart } = useContext(CartContext)
    const [preview, setPreview] = useState(null)
    const navigate = useNavigate()
    console.log(cart)
    if (cart.length === 0) {
        return <h2>Your Cart is Empty</h2>
    }

    const totalAmount = cart.reduce((acc, item) => {
        return acc + item.price * item.qty
    }, 0)

    const [form, setForm] = useState({
        name: "",
        phone: "",
        address: "",
        orderType: "pickup"
    })

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }
    const handleCheckout = async () => {
        const token = localStorage.getItem("token");

        if (!token) {
            alert("Please login first");
            navigate("/login");
            return;
        }

        try {
            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/api/payment/create-checkout-session`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        customer: form,
                        items: cart.map(item => ({
                            productId: item._id,
                            quantity: item.qty
                        }))
                    })
                }
            );

            const data = await response.json();

            window.location.href = data.url;

        } catch (err) {
            console.error("Stripe checkout error:", err);
        }
    };
console.log("API URL:", import.meta.env.VITE_API_URL)
    useEffect(() => {
        const fetchPreview = async () => {
            const token = localStorage.getItem("token")
            if (!token) return

            try {
                const response = await fetch(
                    `${import.meta.env.VITE_API_URL}/api/orders/preview`,
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`
                        },
                        body: JSON.stringify({
                            items: cart.map(item => ({
                                productId: item._id,
                                quantity: item.qty
                            }))
                        })
                    }
                )

                const data = await response.json()
                if (response.ok) {
                    setPreview(data)
                }

            } catch (error) {
                console.error("Preview fetch error:", error)
            }
        }

        fetchPreview()
    }, [cart])


    const handleSubmit = async (e) => {
        e.preventDefault()

        const token = localStorage.getItem("token")

        if (!token) {
            alert("Please login first")
            navigate("/login")
            return
        }

        const orderPayload = {
            customer: {
                name: form.name,
                phone: form.phone
            },
            orderType: form.orderType,
            deliveryAddress: form.orderType === "delivery" ? form.address : null,
            items: cart.map(item => ({
                productId: item._id,
                quantity: item.qty
            }))
        }

        try {
            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/api/orders`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    },
                    body: JSON.stringify(orderPayload)
                }
            )

            const data = await response.json()

            if (!response.ok) {
                alert(data.message || "Failed to place order")
                return
            }

            // Backend now returns:
            // subtotal
            // discountAmount
            // totalAmount

            console.log("Order Breakdown:", data)

            clearCart()
            alert(`Order Placed! You saved ₹${data.discountAmount}`)
            navigate("/")

        } catch (error) {
            console.error("Error placing order:", error)
            alert("Server error")
        }
    }

    return (
        <div className="min-h-screen  bg-gray-100 py-35 px-4">
            <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-2xl p-8 grid md:grid-cols-2 gap-8">

                {/* LEFT SIDE - ORDER SUMMARY */}
                <div>
                    <h2 className="text-2xl font-bold mb-6 border-b pb-3">
                        Order Summary
                    </h2>

                    <div className="space-y-4">
                        {cart.map((item) => (
                            <div key={item.id} className="flex justify-between items-center border-b pb-2">
                                <div>
                                    <p className="font-medium">{item.name}</p>
                                    <p className="text-sm text-gray-500">
                                        ₹{item.price} × {item.qty}
                                    </p>
                                </div>
                                <p className="font-semibold">
                                    ₹{item.price * item.qty}
                                </p>
                            </div>
                        ))}
                    </div>

                    {/* <div className="mt-6 flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span>₹{totalAmount}</span>
                </div> */}
                    <div className="mt-6 space-y-2 text-lg font-semibold">
                        <div className="flex justify-between">
                            <span>Subtotal</span>
                            <span>₹{preview?.subtotal || 0}</span>
                        </div>

                        <div className="flex justify-between text-green-600">
                            <span>Discount</span>
                            <span>- ₹{preview?.discountAmount || 0}</span>
                        </div>

                        <div className="flex justify-between border-t pt-2 font-bold">
                            <span>Total</span>
                            <span>₹{preview?.totalAmount || 0}</span>
                        </div>
                    </div>
                </div>

                {/* RIGHT SIDE - FORM */}
                <div>
                    <h2 className="text-2xl font-bold mb-6 border-b pb-3">
                        Customer Details
                    </h2>

                    <form onSubmit={handleSubmit} className="space-y-4">

                        <input
                            type="text"
                            name="name"
                            placeholder="Full Name"
                            value={form.name}
                            onChange={handleChange}
                            required
                            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                        />

                        <input
                            type="text"
                            name="phone"
                            placeholder="Phone Number"
                            value={form.phone}
                            onChange={handleChange}
                            required
                            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                        />




                        <textarea
                            name="address"
                            placeholder="Address"
                            value={form.address}
                            onChange={handleChange}
                            required={form.orderType === "delivery"}
                            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                        />

                        <select
                            name="orderType"
                            value={form.orderType}
                            onChange={handleChange}
                            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                        >
                            <option value="pickup">Pickup</option>
                            <option value="delivery">Delivery</option>
                        </select>

                        <button
                            type="button"
                            className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition font-semibold"
                            onClick={handleCheckout}
                        >
                            Pay & Place Order
                        </button>

                        {/* <button
                        type="submit"
                        className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition font-semibold"
                     onClick={handleCheckout} >
                        Place Order
                    </button> */}
                        {/* <button onClick={handleCheckout} disabled={cart.length === 0}>
  Checkout
</button> */}

                    </form>
                </div>
            </div>
        </div>
    )
}

export default Checkout