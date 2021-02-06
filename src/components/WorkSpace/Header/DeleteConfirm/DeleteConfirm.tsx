import React, {ChangeEvent, Dispatch, FormEvent, useState} from 'react'
import cn from "classnames";
import Modal from "../../../Modal/Modal";
import {TRootState} from "../../../../redux/rootReducer";
import {onDeleteAccount} from "../../../../redux/user/userActions";
import {connect} from "react-redux";

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
          <button onClick={onClose} type="button" className="btn btn-warning">cancel</button>
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