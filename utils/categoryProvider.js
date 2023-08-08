import axios from 'axios'

async function fetchCategories() {
  // return [
  //   {
  //     "id": 1,
  //     "name": "lampi",
  //     "description": "nekvi lampi",
  //     "created_at": "2023-05-01T11:08:51.830311Z"
  //   }
  // ]

  // const API_URL = 'http://localhost:8080/api'
  let res = await axios.get(`${process.env.API_URL}/categories`)
  return res.data
}

async function fetchCategoriesNameArray() {
  let res = await axios.get(`${process.env.API_URL}/categories`)
  // make a list of the names of the categories
  var categories = []
  res.data.forEach((category) => {
    categories.push(category.name)
  })

  return Promise.resolve(categories)

}



export {
  fetchCategories,
  fetchCategoriesNameArray
}