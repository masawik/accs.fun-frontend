import React from 'react'
import styles from './Modal.module.css'

type TModalProps = {
  children: React.ReactNode,
  onClose: () => void
}

const Modal: React.FC<TModalProps> = ({children, onClose}) => {
  return (
    <>
      <div onClick={onClose} className={styles.wrapper}/>

      <div className={styles.container}>
        <div className={styles.header}>
              <h5 className={styles.title}>DELETE THIS ACCOUNT</h5>
              <button
                onClick={onClose}
                type="button"
                className={styles.closeBtn}
              >&times;</button>
        </div>
        {children}
      </div>
    </>
  )
}

export default Modal