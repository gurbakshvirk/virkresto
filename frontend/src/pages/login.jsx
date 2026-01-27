import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: '',
    password: ''
  })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/auth/login`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form),
          credentials: 'include'
        }
      )

      const data = await res.json()

      if (!res.ok) {
        toast.error(data.message || 'Login failed')
        return
      }

      toast.success('Logged in successfully')
      setForm({ email: '', password: '' })
      const interval = 2000;
      setTimeout(() => {
        navigate('/')
      }, 2000)



    } catch (err) {
      toast.error('Server error')
      console.error(err)
    }
  }

  return (
    <section className="min-h-screen flex items-center justify-center bg-white">
      <div className="w-full max-w-md p-8 border rounded-xl">
        <h2 className="text-3xl font-bold mb-2">Welcome back</h2>
        <p className="mb-6 text-gray-600">Login to continue</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full border px-4 py-2 rounded"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
            className="w-full border px-4 py-2 rounded"
          />

          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded hover:bg-gray-800"
          >
            Login
          </button>
        </form>

        {/* <ToastContainer position="top-right" autoClose={3000} /> */}
      </div>
    </section>
  )
}

export default Login
