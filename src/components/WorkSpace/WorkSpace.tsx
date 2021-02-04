import React from 'react'
import Header from "./Header/Header";
import MailList from "./MailList/MailList";
import {TRootState} from "../../redux/rootReducer";
import {connect} from "react-redux";
import { Redirect } from 'react-router-dom';

type TWorkSpaceProps = {
  login: string | null
}

const WorkSpace: React.FC<TWorkSpaceProps> = ({login}) => {
  if (!login) return <Redirect to='/login'/>
  return (
    <>
      <Header/>
      <MailList/>
    </>
  )
}

const mapStateToProps = (state: TRootState) => ({
  login: state.user.login
})


export default connect(mapStateToProps)(WorkSpace)