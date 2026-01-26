const API_URL = 'https://fakestoreapi.com/products'

export const getAllProducts = async () => {
  const response = await fetch(API_URL)
  if (!response.ok) throw new Error('Failed to fetch All products')
  return await response.json()
}

export const getSingleProduct = async (id) => {
  const response = await fetch(`${API_URL}/${id}`)
  if (!response.ok) throw new Error('Failed to fetch single product')
  return await response.json()
}
