import React, { useContext, useState } from 'react'
import { CartContext } from '../context/CartContext'
import { useNavigate } from 'react-router-dom'

const Checkout = () => {

    const { cart, clearCart } = useContext(CartContext)
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

    const handleSubmit = async (e) => {
        e.preventDefault()

        const orderPayload = {
            items: cart.map(item => ({
                productId: item.id,
                quantity: item.qty
            }))
        }
        console.log("cart:", cart)
        console.log("Order Payload:", orderPayload)

        try {
            const response = await fetch("", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(orderPayload)
            })

            if (response.ok) {
                clearCart()
                alert("Order Placed Successfully")
                navigate("/")
            }
        } catch (error) {
            console.error("Error placing order:", error)
            alert("Failed to place order")
        }
    }

    return (
    <div className="min-h-screen bg-gray-100 py-20 px-4">
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

                <div className="mt-6 flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span>₹{totalAmount}</span>
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
                        required
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
                        type="submit"
                        className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition font-semibold"
                    >
                        Place Order
                    </button>

                </form>
            </div>
        </div>
    </div>
)
}

export default Checkout