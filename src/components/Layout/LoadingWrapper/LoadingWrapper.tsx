import React from 'react'

const LoadingWrapper: React.FC = () => {
  return (
    <div
      className='d-flex flex-column justify-content-center align-items-center'
      style={{height: '100vh'}}
    >
      <div
        className="spinner-border text-info"
        role="status"
        style={{height: '75px', width: '75px'}}
      >
      </div>
      <div className='fs-2 mt-2'>
        Loading...
      </div>
    </div>
  )
}

export default LoadingWrapper