import React, {Dispatch, useEffect} from 'react'
import LoginForm from "./components/LoginForm/LoginForm"
import {connect, MapDispatchToProps} from "react-redux"
import Layout from "./components/Layout/Layout"
import {init} from "./redux/init/initActions"
import WorkSpace from "./components/WorkSpace/WorkSpace"
import {Redirect, Route, Switch } from 'react-router-dom'
import './app.GLOBAL.css'

type TAppProps = TDispatchProps
//todo обработать ошибки подключения к серверу на этапе инициализации
//todo обработать ошибки подключения к imap серверу
const App: React.FC<TAppProps> = ({onInit}) => {

  useEffect(()=> {
    onInit()
  }, [])

  return (
    <Layout>
      <div className='container'>
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
      </div>
    </Layout>
  )
}

type TDispatchProps = {
  onInit: () => void
}

const mapDispatchToProps: MapDispatchToProps<TDispatchProps, Object> = (dispatch: Dispatch<any>) => ({
  onInit: () => dispatch(init())
})

export default connect(null, mapDispatchToProps)(App)
