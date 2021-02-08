import React, {ChangeEvent, Dispatch, FormEvent, useState} from 'react'
import cn from "classnames";
import Modal from "../../../Modal/Modal";
import {TRootState} from "../../../../redux/rootReducer";
import {onDeleteAccount} from "../../../../redux/user/userActions";
import {connect} from "react-redux";
import styles from './DeleteConfirm.module.css'

type TDeleteConfirm = {
  onClose: () => void,
  onDelete: (password: string) => void,
  isUserFetching: boolean,
  deleteErrorMessage: string | null
}

const DeleteConfirm: React.FC<TDeleteConfirm> = ({onClose, onDelete, isUserFetching, deleteErrorMessage}) => {
  const [modalPassword, setModalPassword] = useState('')

  const modalPasswordHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setModalPassword(e.target.value)
  }
  const onSubmitDeleteAccount = (e: FormEvent) => {
    e.preventDefault()
    onDelete(modalPassword)
  }

  return (
    <Modal
      onClose={onClose}
    >
      <form
        onSubmit={onSubmitDeleteAccount}
      >
        <div className={styles.passwordInputBox}>
          <label htmlFor="password" className={styles.passwordInput__label}>password</label>
          <input
            value={modalPassword}
            onChange={modalPasswordHandler}
            type="password"
            className={cn(
              styles.passwordInput,
              {'invalid': deleteErrorMessage}
            )}
            id="password"
            required
          />
          {deleteErrorMessage && <span className='invalid'>{deleteErrorMessage}</span>}
        </div>

        <div className={styles.buttonBox}>
          <button onClick={onClose} type="button" className={cn('btn', styles.cancelBtn)}>cancel</button>
          <button type="submit" className={cn('btn', styles.deleteBtn)}>
            {
              isUserFetching
                ? <span className={cn('spinner', styles.spinner)}/>
                : 'delete'
            }
          </button>
        </div>
      </form>
    </Modal>
  )
}

const mapStateToProps = (state: TRootState) => ({
  isUserFetching: state.user.isFetching,
  deleteErrorMessage: state.user.deleteErrorMessage
})

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  onDelete: (password: string) => dispatch(onDeleteAccount(password))
})

export default connect(mapStateToProps, mapDispatchToProps)(DeleteConfirm)