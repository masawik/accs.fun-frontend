import React, {useEffect} from 'react'
import {RouteComponentProps} from "react-router-dom"
import {useDispatch, useSelector} from "react-redux"
import {TRootState} from "../../../redux/rootReducer"
import {getMailBody} from "../../../redux/mail/mailActions"
import LoadingWrapper from "../../Layout/LoadingWrapper/LoadingWrapper"
import parse from 'html-react-parser'
import styles from './Mail.module.css'

const Mail: React.FC<RouteComponentProps<{uid: string}>> = (props) => {
  const dispatch = useDispatch()
  const mailBody = useSelector((state:TRootState) => state.mail.currentMailBody)
  const isFetching = useSelector((state:TRootState) => state.mail.isFetching)
  const uid = props.match.params.uid

  useEffect(() => {
    if (!mailBody) {
      dispatch(getMailBody(uid))
    }
  }, [dispatch, mailBody, uid])

  return (
    <>
      {
        isFetching || !mailBody
        ? <LoadingWrapper />
        : (
          <div className={styles.container}>
              {parse(mailBody)}
          </div>
          )
      }
    </>
  )
}

export default Mail
