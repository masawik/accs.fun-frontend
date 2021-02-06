import React, {ChangeEvent, Dispatch, FormEvent, useState} from 'react'
import cn from 'classnames'
import {connect} from "react-redux";
import {onLogin} from "../../redux/user/userActions";
import {TLoginData} from "../../redux/user/userTypes";
import {TRootState} from "../../redux/rootReducer";
import { Redirect } from 'react-router-dom';
import {DOMAINS} from "../../redux/api";

type TLoginFormProps = TMapDispatchToProps & TMapStateToProps

const LoginForm: React.FC<TLoginFormProps> = ({onLogin, isFetching, errorMessage, currentLogin}) => {
  const [login, setLogin] = useState('madelynfloydn5')
  const [loginError, setLoginError] = useState<string | false>(false)
  const [domain, setDomain] = useState('egsabuser.mcdir.ru')
  const [password, setPassword] = useState('B9c2jHlZQd')

  if (currentLogin) return <Redirect to='/dashboard'/>


  const $domains = DOMAINS.map((i) => (
    <option key={i} value={i}>{i}</option>
  ))

  const handleLogin = (e: ChangeEvent<HTMLInputElement>): void => {
    let val = e.target.value.trim()

    if (/@/.test(val)) {
      const [login, domain] = val.split('@')
      if (DOMAINS.includes(domain)) {
        setDomain(domain)
        val = login
        if (loginError) setLoginError(false)
      } else {
        if (!loginError) setLoginError('указанный домен не существует.')
      }
    } else {
      if (loginError) setLoginError(false)
    }

    setLogin(val)
  }

  const formSubmit = (e: FormEvent): void => {
    e.preventDefault()
    const fullLogin = `${login}@${domain}`
    onLogin({
      login: fullLogin,
      password: password
    })
  }

  return (
    <form
      onSubmit={formSubmit}
      className='col-sm-10 col-md-8 col-lg-6 offset-sm-1 offset-md-2 offset-lg-3 mt-5'
    >
      {
        errorMessage
          ? <div className="alert alert-danger" role="alert">{errorMessage}</div>
          : null
      }
      <div className="input-group mb-3">
        <input
          value={login}
          onChange={handleLogin}
          type="text"
          className={cn(
            "form-control col-8",
            {'is-invalid': loginError}
          )}
          placeholder='login'
          required
          disabled={isFetching}
        />

        <span className="input-group-text">@</span>

        <select
          value={domain}
          onChange={(e) => {
            setDomain(e.target.value)
          }}
          className="form-select"
          disabled={isFetching}
        >
          {$domains}
        </select>
        {loginError && <div className="invalid-feedback">{loginError}</div>}

      </div>

      <div className="mb-3">
        <input
          value={password}
          onChange={(e) => {
            setPassword(e.target.value)
          }}
          type="password"
          className="form-control"
          placeholder='password'
          required
          disabled={isFetching}
        />
      </div>

      <button
        type="submit"
        className="btn btn-primary"
        disabled={isFetching}
      >
        {
          isFetching
            ? <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"/>
            : 'Log in'
        }
      </button>
    </form>
  )
}

type TMapStateToProps = {
  isFetching: boolean,
  errorMessage: string | null,
  currentLogin: string | null
}

const mapStateToProps = (state: TRootState): TMapStateToProps => ({
  isFetching: state.user.isFetching,
  errorMessage: state.user.loginErrorMessage,
  currentLogin: state.user.login
})

type TMapDispatchToProps = {
  onLogin: (data: TLoginData) => void
}
const mapDispatchToProps = (dispatch: Dispatch<any>): TMapDispatchToProps => ({
  onLogin: (data: TLoginData) => dispatch(onLogin(data)),
})

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm)