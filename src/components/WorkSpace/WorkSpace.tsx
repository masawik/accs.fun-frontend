import React from 'react'
import Header from "./Header/Header";
import MailList from "./MailList/MailList";
import {TRootState} from "../../redux/rootReducer";
import {connect} from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom';
import Mail from "./Mail/Mail";

type TWorkSpaceProps = {
  login: string | null
}

const WorkSpace: React.FC<TWorkSpaceProps> = ({login}) => {
  if (!login) return <Redirect to='/login'/>

  return (
    <>
      <Header/>
      <Switch>
        <Route path='/dashboard/mail/:uid' component={Mail}/>
        <Route path='/dashboard' component={MailList}/>
      </Switch>
    </>
  )
}

const mapStateToProps = (state: TRootState) => ({
  login: state.user.login
})


export default connect(mapStateToProps)(WorkSpace)