import React from 'react'
import styles from '@/components/Spacer/Spacer.module.css'
function Spacer({ direaction }) {
  return (
    <div className={direaction == "horizontal" ? styles.HorizontalSpacer : styles.VerticalSpacer}></div>
  )
}

export default Spacer