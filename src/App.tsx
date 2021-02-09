import React, {useEffect} from 'react'
import LoginForm from "./components/LoginForm/LoginForm"
import {useDispatch} from "react-redux"
import Layout from "./components/Layout/Layout"
import {init} from "./redux/init/initActions"
import WorkSpace from "./components/WorkSpace/WorkSpace"
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
          <WorkSpace/>
        </Route>

        <Route path='/'>
          <Redirect to='/login'/>
        </Route>
      </Switch>
    </Layout>
  )
}

export default App
