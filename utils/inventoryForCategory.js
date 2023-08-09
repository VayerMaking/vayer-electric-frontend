import axios from 'axios'

async function inventoryForCategory (category) {
  let res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/products/category/${category}`)

  console.log(res.data)

  return res.data

}

export default inventoryForCategory