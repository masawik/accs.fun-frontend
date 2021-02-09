import React from 'react'
import Header from "./Header/Header";
import MailList from "./MailList/MailList";
import {TRootState} from "../../redux/rootReducer";
import {useSelector} from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom';
import Mail from "./Mail/Mail";

const WorkSpace: React.FC = () => {
  const login = useSelector((state: TRootState) => state.user.login)
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

export default WorkSpace