import React from 'react'
import CategoryItem from '@/CategoryItem/CategoryItem'
import Spacer from '@/Spacer/Spacer'

function SideBar() {
  return (
    <div className=' d-flex justify-content-between'>
      <div className='d-flex flex-column w-100 gap-3 pt-5'>
        <CategoryItem categoryName={"Woman’s Fashion"} />
        <CategoryItem categoryName={"Men’s Fashion"} />
        <CategoryItem categoryName={"Home & Lifestyle"} />
        <CategoryItem categoryName={"Medicine"} />
        <CategoryItem categoryName={"Sports & Outdoor"} />
        <CategoryItem categoryName={"Baby’s & Toys"} />
        <CategoryItem categoryName={"Groceries & Pets"} />
        <CategoryItem categoryName={"Health & Beauty"} />
      </div>
      <Spacer direaction={"vertical"} />
    </div>

  )
}

export default SideBar