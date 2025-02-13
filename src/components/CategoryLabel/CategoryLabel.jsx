import React from 'react'
import styles from './CategoryLabel.module.css'
function CategoryLabel({ categoryName , description}) {
  return (
    <div>
      <div className={`${styles.categoryLabel} d-flex align-items-center`}>
        <div className={`${styles.redCard} rounded`}></div>
        <h6 className='ms-3 mb-0'> {categoryName} </h6>
      </div>
      <h4 className='mb-0 mt-3'>{description}</h4>
    </div>
  );
}

export default CategoryLabel