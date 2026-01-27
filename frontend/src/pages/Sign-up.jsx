import React, { useState } from 'react'

const Signup = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  const passwordRegex =
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&._-])[A-Za-z\d@$!%*?&._-]{8,}$/

  const [form, setForm] = useState({
    name: '',
    username: '',
    email: '',
    phone: '',
    password: ''
  })

  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const [showHint, setShowHint] = useState(false)
  const [showEmailHint, setShowEmailHint] = useState(false)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  // const handleSubmit = async (e) => {
  //   e.preventDefault()

  //   if (!emailRegex.test(form.email)) {
  //     setError('Please enter a valid email address')
  //     return
  //   }

  //   if (!passwordRegex.test(form.password)) {
  //     setError(
  //       'Password must be at least 8 characters, include uppercase, lowercase, number & special character'
  //     )
  //     return
  //   }

  //   setError('')
    
  //   setMessage('Form validated (backend comes next)')

  //   console.log(form)
  // }
  const handleSubmit = async (e) => {
  e.preventDefault()

  if (!emailRegex.test(form.email)) {
    setError('Please enter a valid email address')
    return
  }

  if (!passwordRegex.test(form.password)) {
    setError(
      'Password must be at least 8 characters, include uppercase, lowercase, number & special character'
    )
    return
  }

  try {
    const res = await fetch('http://localhost:5000/api/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
      credentials: 'include'
    })

    const data = await res.json()

    if (!res.ok) {
      setError(data.message || 'Signup failed')
      return
    }

    setMessage('Account created successfully')
    setError('')
  } catch (err) {
    setError('Server error')
  }
}


   return (
    <section className="min-h-screen flex items-center justify-center bg-white">
      <div className="w-full max-w-md p-8 border rounded-xl">
        <h2 className="text-3xl font-bold mb-2">Create Account</h2>
        <p className="mb-6 text-gray-600">Join us and start ordering</p>

        {message && <p className="text-green-600 mb-3">{message}</p>}
        {error && <p className="text-red-600 mb-3">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full border px-4 py-2 rounded"
          />

          <input
            type="text"
            name="username"
            placeholder="Username"
            value={form.username}
            onChange={handleChange}
            required
            className="w-full border px-4 py-2 rounded"
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={form.email}
            onChange={handleChange}
            onFocus={() => setShowEmailHint(true)}
            onBlur={() => setShowEmailHint(false)}
            required
            className="w-full border px-4 py-2 rounded"
          />

          {showEmailHint && (
            <p className="text-sm text-gray-500">
              Use a valid format like: name@example.com
            </p>
          )}

          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={form.phone}
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
            onFocus={() => setShowHint(true)}
            onBlur={() => setShowHint(false)}
            required
            className="w-full border px-4 py-2 rounded"
          />

          {showHint && (
            <p className="text-sm text-gray-500">
              Must include uppercase, lowercase, number & special character (min 8 chars)
            </p>
          )}

          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded hover:bg-gray-800"
          >
            Register
          </button>
        </form>
      </div>
    </section>
  )
}   

export default Signup
