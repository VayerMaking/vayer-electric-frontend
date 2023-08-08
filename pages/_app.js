import '../styles/globals.css'
import Layout from '../layouts/layout'
import {fetchCategoriesNameArray} from '../utils/categoryProvider'

function SafeHydrate({ children }) {
  return (
    <div suppressHydrationWarning>
      {typeof window === 'undefined' ? null : children}
    </div>
  )
}

function Ecommerce({ Component, pageProps, categories }) {
  return (
    <SafeHydrate>
    <Layout categories={categories}>
      <Component {...pageProps} />
    </Layout>
    </SafeHydrate>
  )
}

Ecommerce.getServerSideProps = async () => {
  const categories = await fetchCategoriesNameArray()
  return {
    categories
  }
}

export default Ecommerce