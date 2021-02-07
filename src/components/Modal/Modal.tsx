import React from 'react'
import styles from './Modal.module.css'

type TModalProps = {
  children: React.ReactNode,
  onClose: () => void
}

const Modal: React.FC<TModalProps> = ({children, onClose}) => {
  return (
    <>
      <div className={styles.wrapper}/>

      <div className={styles.container}>
        <div className="modal-dialog">
              <h5 className={styles.title}>DELETE THIS ACCOUNT</h5>
              <button onClick={onClose} type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"/>
            </div>
            {children}
      </div>
    </>
  )
}

export default Modal