import React, {ChangeEvent, Dispatch, FormEvent, useState} from 'react'
import cn from 'classnames'
import {connect} from "react-redux"
import {onLogin} from "../../redux/user/userActions"
import {TLoginData} from "../../redux/user/userTypes"
import {TRootState} from "../../redux/rootReducer"
import {Redirect} from 'react-router-dom'
import {DOMAINS} from "../../redux/api"
import styles from './LoginForm.module.css'

type TLoginFormProps = TMapDispatchToProps & TMapStateToProps

const LoginForm: React.FC<TLoginFormProps> = ({onLogin, isFetching, errorMessage, currentLogin}) => {
  const [login, setLogin] = useState('')
  const [loginError, setLoginError] = useState<string | false>(false)
  const [domain, setDomain] = useState('egsabuser.mcdir.ru')
  const [password, setPassword] = useState('')

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
  //todo убрать костыль
  const isAuthError = errorMessage === 'wrong password' || errorMessage === 'invalid auth data'

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        <span className={styles.title__marked}>ACCS</span>.FUN
      </h1>
      <form
        onSubmit={formSubmit}
        className={cn('plate-light', styles.form)}
      >
        <div className={styles.loginBox}>
          {(loginError || errorMessage) && <span className={cn('invalid', styles.alert)}>{loginError || errorMessage}</span>}
          <input
            value={login}
            onChange={handleLogin}
            type="text"
            className={cn(
              styles.loginInput,
              {'invalid': (Boolean(loginError) || isAuthError)}
            )}
            placeholder='login'
            required
            disabled={isFetching}
          />

          <div className={styles.domainSelectorBox}>
            <select
              value={domain}
              onChange={(e) => {
                setDomain(e.target.value)
              }}
              className={styles.domainSelector}
              disabled={isFetching}
            >
              {$domains}
            </select>
            <svg version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 451.847 451.847">
              <g>
                <path
                  d="M225.923,354.706c-8.098,0-16.195-3.092-22.369-9.263L9.27,151.157c-12.359-12.359-12.359-32.397,0-44.751		c12.354-12.354,32.388-12.354,44.748,0l171.905,171.915l171.906-171.909c12.359-12.354,32.391-12.354,44.744,0		c12.365,12.354,12.365,32.392,0,44.751L248.292,345.449C242.115,351.621,234.018,354.706,225.923,354.706z"/>
              </g>
            </svg>
          </div>
        </div>

        <input
          value={password}
          onChange={(e) => {
            setPassword(e.target.value)
          }}
          type="password"
          placeholder='password'
          required
          className={cn({'invalid': Boolean(isAuthError)})}
          disabled={isFetching}
        />

        <button
          type="submit"
          className={cn(
            'btn',
            styles.submitBtn,
            {[styles.submitBtnShrink]: isFetching}
          )}
          disabled={isFetching}
        >
          {
            isFetching
              ? <span className={cn('spinner', styles.spinner)} />
              : 'Log in'
          }
        </button>
      </form>
    </div>
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