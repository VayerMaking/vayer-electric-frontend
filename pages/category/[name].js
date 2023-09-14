import Head from 'next/head'
import ListItem from '../../components/ListItem'
import { titleIfy, slugify } from '../../utils/helpers'
import { fetchCategories } from '../../utils/categoryProvider'
import inventoryForCategory from '../../utils/inventoryForCategory'
import CartLink from '../../components/CartLink'
import * as consts from '../../consts/consts'
import { useState } from 'react'

const Category = (props) => {
  const { inventory, title } = props
  const filterOptions =
    { id: 'sub_category', label: 'Sub Category', options: { 1: 'led_lampi', 2: 'obiknovenni lampi', 3: 'projectori' } }


    const [selectedSubcategory, setSelectedSubcategory] = useState(null);

    const filteredInventory = inventory.filter((item) => {
      return selectedSubcategory ? item.subcategory_id == selectedSubcategory : true;
    });

    const handleSubcategoryClick = (key) => {
      console.log('Clicked subcategory:', key);

      setSelectedSubcategory(key);

      console.log('Selected subcategory:', selectedSubcategory);
    };

  return (
    <>
      <CartLink />
      <Head>
        <title>Vayer Electric - {title}</title>
        <meta name="description" content={`Vayer Electric - ${title}`} />
        <meta property="og:title" content={`Vayer Electric - ${title}`} key="title" />
      </Head>
      <div className='pageContainer'>
        <div className="filterMenu">
          <div key={filterOptions.id} className="filterOption">
            <h3>{filterOptions.label}</h3>
            <ul>
            {Object.keys(filterOptions.options).map((key) => (
              <li
                key={key}
                onClick={() => {handleSubcategoryClick(key); console.log(selectedSubcategory)}} // Update selected subcategory on click
                className={selectedSubcategory === key ? 'selected' : ''}
              >
                {filterOptions.options[key]}
              </li>
            ))}
          </ul>
          </div>
        </div>


        <div className='productList'>
          <div className="flex flex-col items-center">
            <div className="max-w-fw flex flex-col w-full">
              <div className="pt-4 sm:pt-10 pb-8">
                <h1 className="text-5xl font-light">{titleIfy(title)}</h1>
              </div>

              <div>
                <div className="flex flex-1 flex-wrap flex-row">
                  {
                    filteredInventory.map((item, index) => {
                      return (
                        console.log(item),
                        <ListItem
                          key={index}
                          link={`/product/${slugify(item.name)}`}
                          title={item.name}
                          price={item.price}
                          image_url={`${consts.IMAGES_BASE_URL}/${item.image_url}`}
                        />
                      )
                    })
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export async function getStaticPaths() {
  const categories = await fetchCategories()
  const paths = categories.map(category => {
    return { params: { name: slugify(category.name) } }
  })
  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps({ params }) {
  const category = params.name.replace(/-/g, " ")
  const inventory = await inventoryForCategory(category)
  return {
    props: {
      inventory,
      title: category
    }
  }
}

export default Category