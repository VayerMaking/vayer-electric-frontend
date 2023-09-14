import '../styles/globals.css'
import '../styles/filterMenu.css'
import Layout from '../layouts/layout'
import {fetchCategoriesNameArray} from '../utils/categoryProvider'


function Ecommerce({ Component, pageProps, categories }) {
  return (
    <Layout categories={categories}>
      <Component {...pageProps} />
    </Layout>
  )
}

Ecommerce.getServerSideProps = async () => {
  const categories = await fetchCategoriesNameArray()
  return {
    categories
  }
}

export default Ecommerce