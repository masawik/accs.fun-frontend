import React, {ChangeEvent, Dispatch, FormEvent, useState} from 'react'
import {connect} from "react-redux"
import {TRootState} from "../../../redux/rootReducer"
import {getMails} from "../../../redux/mail/mailActions"
import {onDeleteAccount, onLogout} from "../../../redux/user/userActions"
import {Link, useLocation} from 'react-router-dom'
import Modal from "./Modal/Modal"
import cn from 'classnames'

type THeaderProps = {
  isMailFetching: boolean,
  isUserFetching: boolean,
  onLoadMails: () => void,
  onLogout: () => void,
  login: string | null,
  onDelete: (password: string) => void,
  deleteErrorMessage: string | null
}

const Header: React.FC<THeaderProps> = ({isMailFetching, onLoadMails, onLogout, login, isUserFetching, onDelete, deleteErrorMessage}) => {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [modalPassword, setModalPassword] = useState('')

  const location = useLocation()
  const isInMail = /\/dashboard\/mail\/.+/.test(location.pathname)
  const $goBackButton = (
    <Link to='/dashboard' className='btn btn-light'>
      <svg
        xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-arrow-left"
        viewBox="0 0 16 16">
        <path fillRule="evenodd"
              d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
      </svg>
      <span className='d-none d-sm-inline'>Go back</span>
    </Link>
  )
  const $refreshButton = (
    <button
      type="button"
      className="btn btn-success"
      onClick={onLoadMails}
      disabled={isMailFetching}
    >
      <svg
        style={{
          animation: isMailFetching ? '.75s linear infinite spinner-border' : 'none'
        }}
        xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"
        className="bi bi-arrow-repeat" viewBox="0 0 16 16">
        <path
          d="M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0 1-.384 0l-1.966-2.36a.25.25 0 0 1 .192-.41zm-11 2h3.932a.25.25 0 0 0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59A.25.25 0 0 0 .534 9z"/>
        <path fillRule="evenodd"
              d="M8 3c-1.552 0-2.94.707-3.857 1.818a.5.5 0 1 1-.771-.636A6.002 6.002 0 0 1 13.917 7H12.9A5.002 5.002 0 0 0 8 3zM3.1 9a5.002 5.002 0 0 0 8.757 2.182.5.5 0 1 1 .771.636A6.002 6.002 0 0 1 2.083 9H3.1z"/>
      </svg>
      <span className='d-none d-sm-inline'>refresh</span>
    </button>
  )

  const toggleModal = () => {
    setIsModalVisible(prevState => !prevState)
  }

  const modalPasswordHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setModalPassword(e.target.value)
  }

  const onSubmitDeleteAccount = (e: FormEvent) => {
    e.preventDefault()
    onDelete(modalPassword)
  }

  return (
    <nav className="navbar navbar-dark bg-primary position-relative">
      <div className="container-fluid">
        {isInMail && $goBackButton}
        <span className="navbar-brand fs-6 fs-sm-5">{login}</span>

        <div className='d-flex justify-content-around flex-grow-1 flex-sm-grow-0'>
          {!isInMail && $refreshButton}
          <button
            type="button"
            className="btn btn-danger"
            style={{margin: '0 10px'}}
            onClick={toggleModal}
            disabled={isMailFetching}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                 fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
              <path
                d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
              <path fillRule="evenodd"
                    d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
            </svg>
            <span className='d-none d-sm-inline'>delete this account forever</span>
          </button>
          <button
            type="button"
            className="btn btn-warning"
            onClick={onLogout}
            disabled={isMailFetching}
          >
            logout
          </button>
        </div>
      </div>
      {isModalVisible &&
      <Modal
        onClose={toggleModal}
      >
        <form
          onSubmit={onSubmitDeleteAccount}
          className="modal-body"
        >
          <div className="mb-3">
            <label htmlFor="password" className="form-label">password</label>
            <input
              value={modalPassword}
              onChange={modalPasswordHandler}
              type="password"
              className={cn(
                'form-control',
                {'is-invalid': deleteErrorMessage}
              )}
              id="password"
              required
            />
            {deleteErrorMessage && <div className="invalid-feedback d-block fs-6">{deleteErrorMessage}</div>}
          </div>
          <div className="modal-footer">
            <button onClick={toggleModal} type="button" className="btn btn-warning">cancel</button>
            <button type="submit" className="btn btn-danger">
              {
                isUserFetching
                  ? <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"/>
                  : 'delete'
              }
            </button>
          </div>
        </form>
      </Modal>
      }
    </nav>
  )
}

const mapStateToProps = (state: TRootState) => ({
  isMailFetching: state.mail.isFetching,
  login: state.user.login,
  isUserFetching: state.user.isFetching,
  deleteErrorMessage: state.user.deleteErrorMessage
})

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  onLoadMails: () => dispatch(getMails()),
  onLogout: () => dispatch(onLogout()),
  onDelete: (password: string) => dispatch(onDeleteAccount(password))
})

export default connect(mapStateToProps, mapDispatchToProps)(Header)