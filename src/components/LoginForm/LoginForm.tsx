import React, {ChangeEvent, FormEvent, useState} from 'react'
import cn from 'classnames'
import {connect} from "react-redux";
// import {onLogin} from "../../redux/user/userActions";
import {TLoginData} from "../../redux/user/userTypes";

type TLoginFormProps = {
  onLogin: (data: TLoginData) => void
}

const LoginForm: React.FC = () => {
  const [login, setLogin] = useState('')
  const [loginError, setLoginError] = useState<string | false>(false)
  const [domain, setDomain] = useState('egsabuser.mcdir.ru')
  const [password, setPassword] = useState('')

  const DOMAINS = [
    'egsabuser.mcdir.ru',
    'pook.tk',
    'egsacc.mcdir.ru',
    'egsaccount.mcdir.ru',
    'egsfarm.mcdir.ru'
  ]

  const $domains = DOMAINS.map((i) => (
    <option key={i} value={i}>{i}</option>
  ))

  const handleLogin = (e: ChangeEvent<HTMLInputElement>): void => {
    let val = e.target.value

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

    // onLogin({
    //   login: fullLogin,
    //   password: password
    // })
  }

  return (
    <form
      onSubmit={formSubmit}
      className='col-sm-10 col-md-8 col-lg-6 offset-sm-1 offset-md-2 offset-lg-3 mt-5'
    >
      <div className="input-group mb-3">
        <input
          value={login}
          onChange={handleLogin}
          type="text"
          className={cn(
            "form-control col-8",
            {'is-invalid': loginError}
          )}
          id="login"
          required
        />

        <span className="input-group-text">@</span>

        <select
          value={domain}
          onChange={(e) => {
            setDomain(e.target.value)
          }}
          className="form-select"
        >
          {$domains}
        </select>
        {loginError && <div className="invalid-feedback">{loginError}</div>}

      </div>

      <div className="mb-3">
        <label htmlFor="password" className="form-label">Password</label>
        <input
          value={password}
          onChange={(e) => {
            setPassword(e.target.value)
          }}
          type="password"
          className="form-control"
          id='password'
          required
        />
      </div>

      <button
        type="submit"
        className="btn btn-primary"
      >Submit
      </button>
    </form>
  )
}

// const mapDispatchToProps = (dispatch: any) => ({
//   onLogin: (data: TLoginData) => dispatch(onLogin(data))
// })

export default connect(null, null)(LoginForm)