import React, {Dispatch, useEffect} from 'react'
import LoginForm from "./components/LoginForm/LoginForm";
import {TRootState} from "./redux/rootReducer";
import {connect, MapDispatchToProps, MapStateToProps} from "react-redux";
import Layout from "./components/Layout/Layout";
import {init} from "./redux/init/initActions";
import WorkSpace from "./components/WorkSpace/WorkSpace";
import {Redirect, Route, Switch } from 'react-router-dom';
import './app.GLOBAL.css'

type TAppProps = TStateProps & TDispatchProps

const App: React.FC<TAppProps> = ({login, onInit}) => {

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

type TStateProps = {
  login: string | null
}

const mapStateToProps: MapStateToProps<TStateProps, Object, TRootState> = (state) => ({
  login: state.user.login
})

type TDispatchProps = {
  onInit: () => void
}

const mapDispatchToProps: MapDispatchToProps<TDispatchProps, Object> = (dispatch: Dispatch<any>) => ({
  onInit: () => dispatch(init())
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
