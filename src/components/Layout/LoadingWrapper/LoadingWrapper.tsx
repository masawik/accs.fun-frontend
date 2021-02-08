import React from 'react'
import styles from './LoadingWrapper.module.css'


const LoadingWrapper: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.loader} />
      <div className={styles.text}>
        Loading...
      </div>
    </div>
  )
}

export default LoadingWrapper