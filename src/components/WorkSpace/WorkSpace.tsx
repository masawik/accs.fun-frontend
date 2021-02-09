import React, {useEffect} from 'react'
import Header from "./Header/Header";
import MailList from "./MailList/MailList";
import {TRootState} from "../../redux/rootReducer";
import {useDispatch, useSelector} from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom';
import Mail from "./Mail/Mail";
import {getMails} from "../../redux/mail/mailActions";

const WorkSpace: React.FC = () => {
  const dispatch = useDispatch()
  const login = useSelector((state: TRootState) => state.user.login)

  useEffect(() => {
    dispatch(getMails())
  }, [dispatch])

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