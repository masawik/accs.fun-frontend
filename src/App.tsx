import React, {useEffect} from 'react'
import LoginForm from "./components/LoginForm/LoginForm"
import {useDispatch} from "react-redux"
import Layout from "./components/Layout/Layout"
import {init} from "./redux/init/initActions"
import Dashboard from "./components/Dashboard/Dashboard"
import {Redirect, Route, Switch} from 'react-router-dom'
import './app.GLOBAL.css'

//todo обработать ошибки подключения к серверу на этапе инициализации
//todo обработать ошибки подключения к imap серверу
const App: React.FC = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(init())
  }, [dispatch])

  return (
    <Layout>
      <Switch>
        <Route path='/login'>
          <LoginForm/>
        </Route>

        <Route path='/dashboard'>
          <Dashboard/>
        </Route>

        <Route path='/*'>
          <Redirect to='/dashboard'/>
        </Route>
      </Switch>
    </Layout>
  )
}

export default App
