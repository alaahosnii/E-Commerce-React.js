import React from 'react'
import styles from './ManagerCard.module.css'
import twitterBlack from '../../assets/twitter_black.png'
import instagramBlack from '../../assets/insta_black.png'
import linkedBlack from '../../assets/linked_black.png'
function ManagerCard({ manager }) {
  return (
    <div className={styles.ManagerCard}>
      <img src={manager.managerImage} width={"100%"} height={"430px"} />
      <h4 className='mt-3'>{manager.managerName}</h4>
      <p>{manager.managerPosition}</p>
      <div className='d-flex gap-2'>
        <img src={twitterBlack} width={"20px"} height={"20px"} />
        <img src={instagramBlack} width={"20px"} height={"20px"} />
        <img src={linkedBlack} width={"20px"} height={"20px"} />
      </div>
    </div>
  )
}

export default ManagerCard