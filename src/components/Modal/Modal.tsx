import React from 'react'

type TModalProps = {
  children: React.ReactNode,
  onClose: () => void
}

const Modal: React.FC<TModalProps> = ({children, onClose}) => {
  return (
    <>
      <div
        style={{
          backgroundColor: 'rgba(0,0,0, .5)',
          position: 'fixed',
          top: '0',
          bottom: '0',
          left: '0',
          right: '0',
          zIndex: 1
        }}
      />

      <div className="modal d-block">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">DELETE THIS ACCOUNT</h5>
              <button onClick={onClose} type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"/>
            </div>
            {children}
          </div>
        </div>
      </div>
    </>
  )
}

export default Modal