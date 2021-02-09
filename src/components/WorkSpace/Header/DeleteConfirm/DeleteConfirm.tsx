import React, {ChangeEvent, FormEvent, useState} from 'react'
import cn from "classnames";
import Modal from "../../../Modal/Modal";
import {TRootState} from "../../../../redux/rootReducer";
import {onDeleteAccount} from "../../../../redux/user/userActions";
import {useDispatch, useSelector} from "react-redux";
import styles from './DeleteConfirm.module.css'

type TDeleteConfirm = {
  onClose: () => void
}

const DeleteConfirm: React.FC<TDeleteConfirm> = ({onClose}) => {
  const dispatch = useDispatch()
  const deleteErrorMessage = useSelector((state: TRootState) => state.user.deleteErrorMessage)
  const isUserFetching = useSelector((state: TRootState) => state.user.isFetching)

  const onDelete = (password: string) => {dispatch(onDeleteAccount(password))}

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

export default DeleteConfirm