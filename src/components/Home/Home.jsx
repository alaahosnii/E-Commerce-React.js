import React from 'react'
import styles from './Home.module.css'
import NavComponent from '../NavComponent/NavComponent'
import SideBar from '../SideBar/SideBar'
import Spacer from '../Spacer/Spacer'
import coverImg from '../../assets/cover_img.png'
import CategoryLabel from '../CategoryLabel/CategoryLabel'
import ProductComponent from '../ProductComponent/ProductComponent'
import products from '../../Products'
function Home() {
  return (
    <div className='d-flex flex-column container'>

      <div className='d-flex'>
        <div className='col-3'>
          <SideBar />
        </div>
        <div className='col-9'>
          <img src={coverImg} width={"100%"} className='pt-3 ps-3 pe-3' />
        </div>
      </div>
      <CategoryLabel categoryName={"Our Products"} description={"Explore Our Products"} />
      <div className='d-flex flex-wrap   justify-content-between'>
        {
          products.map((product) => <ProductComponent key={product.id} product={product} />)
        }
      </div>
    </div>
  )
}

export default Home