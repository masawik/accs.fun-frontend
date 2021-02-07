import React, {Dispatch, useState} from 'react'
import {connect} from "react-redux"
import {TRootState} from "../../../redux/rootReducer"
import {getMails} from "../../../redux/mail/mailActions"
import {onDeleteAccount, onLogout} from "../../../redux/user/userActions"
import {Link, useLocation} from 'react-router-dom'
import DeleteConfirm from "./DeleteConfirm/DeleteConfirm"
import cn from "classnames";
import styles from './Header.module.css'


type THeaderProps = {
  isMailFetching: boolean,
  onLoadMails: () => void,
  onLogout: () => void,
  login: string | null
}

const Header: React.FC<THeaderProps> = ({isMailFetching, onLoadMails, onLogout, login}) => {
  const [isDeleteConfirmVisible, setIsDeleteConfirmVisible] = useState(false)

  const location = useLocation()
  const isInMail = /\/dashboard\/mail\/.+/.test(location.pathname)

  const toggleDeleteConfirm = () => {
    setIsDeleteConfirmVisible(prevState => !prevState)
  }

  const $goBackBtn = (
    <Link to='/dashboard' className={styles.goBackBtn}>
      <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"	 viewBox="0 0 492.004 492.004"><g>	<g>		<path d="M382.678,226.804L163.73,7.86C158.666,2.792,151.906,0,144.698,0s-13.968,2.792-19.032,7.86l-16.124,16.12			c-10.492,10.504-10.492,27.576,0,38.064L293.398,245.9l-184.06,184.06c-5.064,5.068-7.86,11.824-7.86,19.028			c0,7.212,2.796,13.968,7.86,19.04l16.124,16.116c5.068,5.068,11.824,7.86,19.032,7.86s13.968-2.792,19.032-7.86L382.678,265			c5.076-5.084,7.864-11.872,7.848-19.088C390.542,238.668,387.754,231.884,382.678,226.804z"/>	</g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg>
    </Link>
  )
  const $refreshBtn = (
    <button
      type="button"
      className={cn(styles.refreshBtn, {[styles.spinning]: isMailFetching})}
      onClick={onLoadMails}
      disabled={isMailFetching}
    >
      <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g>	<g>		<path d="M463.702,162.655L442.491,14.164c-1.744-12.174-16.707-17.233-25.459-8.481l-30.894,30.894			C346.411,12.612,301.309,0,254.932,0C115.464,0,3.491,109.16,0.005,248.511c-0.19,7.617,5.347,14.15,12.876,15.234l59.941,8.569			c8.936,1.304,17.249-5.712,17.125-15.058C88.704,165.286,162.986,90,254.932,90c22.265,0,44.267,4.526,64.6,13.183l-29.78,29.78			c-8.697,8.697-3.761,23.706,8.481,25.459l148.491,21.211C456.508,181.108,465.105,172.599,463.702,162.655z"/>	</g></g><g>	<g>		<path d="M499.117,249.412l-59.897-8.555c-7.738-0.98-17.124,5.651-17.124,16.143c0,90.981-74.019,165-165,165			c-22.148,0-44.048-4.482-64.306-13.052l28.828-28.828c8.697-8.697,3.761-23.706-8.481-25.459L64.646,333.435			c-9.753-1.393-18.39,6.971-16.978,16.978l21.21,148.492c1.746,12.187,16.696,17.212,25.459,8.481l31.641-31.626			C165.514,499.505,210.587,512,257.096,512c138.794,0,250.752-108.618,254.897-247.28			C512.213,257.088,506.676,250.496,499.117,249.412z"/>	</g></g></svg>
      <span className={styles.refreshBtn__text}>Refresh</span>
    </button>
  )
  const $deleteBtn = (
    <button
      type="button"
      className={cn(styles.sideBtn, styles.deleteBtn)}
      onClick={toggleDeleteConfirm}
    >
      delete account
    </button>
  )
  const $logoutBtn = (
    <button
      type="button"
      className={cn(styles.logoutBtn)}
      onClick={onLogout}
    >
      logout
    </button>
  )

  return (
    <nav className={cn(styles.header)}>
      <h1 className={styles.title}>{login}</h1>

      <div className={styles.buttonsBox}>
        {$deleteBtn}
        {isInMail && $goBackBtn}
        {!isInMail && $refreshBtn}
        {$logoutBtn}
      </div>
      {isDeleteConfirmVisible && <DeleteConfirm onClose={toggleDeleteConfirm}/>}
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