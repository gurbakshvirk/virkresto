import User from '../models/UserModel'

export const registerUser = async (req, res) => {
  const { email } = req.body

  const existingUser = await User.findOne({ email })
  if (existingUser) {
    return res.status(400).json({ message: 'User already exists' })
  }






  
  
}
