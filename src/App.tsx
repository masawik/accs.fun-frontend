import React from 'react'
import LoginForm from "./components/LoginForm/LoginForm";
import {TRootState} from "./redux/rootReducer";
import {connect} from "react-redux";
import Layout from "./components/Layout/Layout";

type TAppProps = {
  login: string | null
}

const App: React.FC<TAppProps> = ({login}) => {
  return (
    <Layout>
      <div className='container'>
        {
          login
            ? <div>авторизирован</div>
            : <LoginForm/>
        }
      </div>
    </Layout>
  )
}

const mapStateToProps = (state: TRootState) => ({
  login: state.user.login
})

export default connect(mapStateToProps)(App)
