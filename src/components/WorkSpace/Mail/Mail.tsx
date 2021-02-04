import React, {Dispatch, useEffect} from 'react'
import {RouteComponentProps} from "react-router-dom";
import {connect} from "react-redux";
import {TRootState} from "../../../redux/rootReducer";
import {getMailBody} from "../../../redux/mail/mailActions";
import LoadingWrapper from "../../Layout/LoadingWrapper/LoadingWrapper";

type TMailProps = {
  mailBody: string | null,
  isFetching: boolean,
  onLoadMail: (uid: string) => void
}

const Mail: React.FC<RouteComponentProps<{uid: string}> & TMailProps> = (props) => {
  const uid = props.match.params.uid
  const {mailBody, isFetching, onLoadMail} = props

  useEffect(() => {
    if (!mailBody) {
      onLoadMail(uid)
    }
  }, [mailBody])

  return (
    <>
      {
        isFetching
        ? <LoadingWrapper />
        : mailBody
      }
    </>
  )
}

const mapStateToProps = (state: TRootState) => ({
  mailBody: state.mail.currentMailBody,
  isFetching: state.mail.isFetching
})

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  onLoadMail: (uid: string) => dispatch(getMailBody(uid))
})

export default connect(mapStateToProps, mapDispatchToProps)(Mail)