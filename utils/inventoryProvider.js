import axios from 'axios'

/*
Inventory items should adhere to the following schema:
type Product {
  id: ID!
  categories: [String]!
  price: Float!
  name: String!
  image: String!
  description: String!
  currentInventory: Int!
  brand: String
  sku: ID
}
*/

async function fetchInventory() {
  // const inventory = API.get(apiUrl)
  // return Promise.resolve(inventory)
  // return [
  //   {
  //     "id": 3,
  //     "name": "lampa",
  //     "description": "shano led lampa",
  //     "subcategory_id": 2,
  //     "price": 200,
  //     "current_inventory": 5,
  //     "image_url": "google.com/bla",
  //     "brand": "shano marka",
  //     "sku": "dsfadf",
  //     "created_at": "2023-05-01T11:39:32.303656Z"
  //   }
  // ]
  // const API_URL = 'http://localhost:8080/api'
  let res = await axios.get(`${process.env.API_URL}/products`)
  console.log(res.data)
  return res.data
}

export {
  fetchInventory
}