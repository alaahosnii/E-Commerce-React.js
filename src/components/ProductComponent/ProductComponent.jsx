import React from 'react'
import styles from './ProductComponent.module.css'
import productImage from '../../assets/product_image.png'
import favoriteIcon from '../../assets/fav_icon.png'
import previewIcon from '../../assets/preview_icon.png'
import star from '../../assets/star.png'
import greyStar from '../../assets/grey_star.png'
function ProductComponent() {
  return (
    <div className='d-flex flex-column mt-5'>
      <div className={`${styles.productImgContainer} position-relative`}>
        <img src={productImage} width={"115px"} height={"180px"} />
        <img src={favoriteIcon} className={styles.favoriteImg} />
        <img src={previewIcon} className={styles.previewIcon} />
      </div>
      <h6 className='mt-2 mb-0'>Breed Dry Dog Food</h6>
      <div className='d-flex gap-2 align-items-center mt-2'>
        <p className='mb-0 text-danger'>$100</p>
        <img src={star} width={"17px"} height={"17px"} />
        <img src={star} width={"17px"} height={"17px"} />
        <img src={star} width={"17px"} height={"17px"} />
        <img src={greyStar} width={"17px"} height={"17px"} />
        <img src={greyStar} width={"17px"} height={"17px"} />
        <p className='mb-0 text-secondary fw-medium'>(35)</p>
      </div>

    </div>
  )
}

export default ProductComponent