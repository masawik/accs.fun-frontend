import React, {Dispatch} from 'react'
import {connect} from "react-redux";
import {TRootState} from "../../../redux/rootReducer";
import {mailFetch} from "../../../redux/mail/mailActions";
import {onLogout} from "../../../redux/user/userActions";
import {Link, useLocation} from 'react-router-dom';

type THeaderProps = {
  isFetching: boolean,
  onLoadMails: () => void,
  onLogout: () => void,
  login: string | null
}

const Header: React.FC<THeaderProps> = ({isFetching, onLoadMails, onLogout, login}) => {
  const location = useLocation()
  const isInMail = /\/dashboard\/mail\/.+/.test(location.pathname)
  //todo всплывающее окно с подтверждением удаления аккаунта

  const $goBackButton = (
    <Link to='/dashboard' className='btn btn-light'>
      <svg
        style={{marginRight: '5px'}}
        xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-arrow-left"
           viewBox="0 0 16 16">
        <path fillRule="evenodd"
              d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
      </svg>
      Go back
    </Link>
  )

  const $refreshButton = (
    <button
      type="button"
      className="btn btn-success"
      onClick={onLoadMails}
      disabled={isFetching}
    >
      <svg
        style={{
          marginRight: '5px',
          animation: isFetching ? '.75s linear infinite spinner-border' : 'none'
        }}
        xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"
        className="bi bi-arrow-repeat" viewBox="0 0 16 16">
        <path
          d="M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0 1-.384 0l-1.966-2.36a.25.25 0 0 1 .192-.41zm-11 2h3.932a.25.25 0 0 0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59A.25.25 0 0 0 .534 9z"/>
        <path fillRule="evenodd"
              d="M8 3c-1.552 0-2.94.707-3.857 1.818a.5.5 0 1 1-.771-.636A6.002 6.002 0 0 1 13.917 7H12.9A5.002 5.002 0 0 0 8 3zM3.1 9a5.002 5.002 0 0 0 8.757 2.182.5.5 0 1 1 .771.636A6.002 6.002 0 0 1 2.083 9H3.1z"/>
      </svg>
      refresh
    </button>
  )
  return (
    <nav className="navbar navbar-dark bg-primary">
      <div className="container-fluid">
        {isInMail && $goBackButton}
        <span className="navbar-brand">{login}</span>

        <div>
          {!isInMail && $refreshButton}
          <button
            type="button"
            className="btn btn-danger"
            style={{margin: '0 10px'}}
            disabled={isFetching}
          >
            <svg style={{marginRight: '5px'}} xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                 fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
              <path
                d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
              <path fillRule="evenodd"
                    d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
            </svg>
            delete this account forever
          </button>
          <button
            type="button"
            className="btn btn-warning"
            onClick={onLogout}
            disabled={isFetching}
          >
            logout
          </button>
        </div>
      </div>
    </nav>
  )
}

const mapStateToProps = (state: TRootState) => ({
  isFetching: state.mail.isFetching,
  login: state.user.login
})

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  onLoadMails: () => dispatch(mailFetch()),
  onLogout: () => dispatch(onLogout())
})

export default connect(mapStateToProps, mapDispatchToProps)(Header)