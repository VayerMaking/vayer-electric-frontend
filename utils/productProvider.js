import axios from 'axios'

async function fetchProducts() {
  // return [
  //   {
  //     "id": 1,
  //     "name": "lampi",
  //     "description": "nekvi lampi",
  //     "created_at": "2023-05-01T11:08:51.830311Z"
  //   }
  // ]

  // const API_URL = 'http://localhost:8080/api'
  let res = await axios.get(`${process.env.API_URL}/products`)
  return res.data
}

async function fetchProductsNameArray() {
  let res = await axios.get(`${process.env.API_URL}/products`)
  // make a list of the names of the categories
  var categories = []
  res.data.forEach((category) => {
    categories.push(category.name)
  })

  return Promise.resolve(categories)

}

async function fetchProductsByCategory(category) {
  let res = await axios.get(`${process.env.API_URL}/products/category/${category}`)

  return res.data
}

async function fetchProductByName(name) {
  let res = await axios.get(`${process.env.API_URL}/products/${name}`)

  return res.data
}



export {
  fetchProducts,
  fetchProductsNameArray,
  fetchProductsByCategory,
  fetchProductByName
}