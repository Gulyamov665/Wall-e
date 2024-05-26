import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useTokenMutation } from '../../store/request/Token'
import { useLocalStorage } from '../hooks/useLocalStorage'
import styles from '../assets/static/Login.module.css'
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined'
import VpnKeyOutlinedIcon from '@mui/icons-material/VpnKeyOutlined'

function Login() {
  const { register, handleSubmit } = useForm()
  const [token, { isLoading }] = useTokenMutation()
  const [auth, setAuth] = useLocalStorage('', 'auth')
  const navigate = useNavigate()

  const handleLogin = async (data) => {
    try {
      const response = await token(data)
      setAuth(response.data.access)
    } catch (error) {
      console.error('Error:', error)
    } finally {
      console.log('Login attempt finished')
    }
  }

  useEffect(() => {
    if (auth) navigate('/main')
  }, [auth])

  return (
    <div className={styles.main}>
      <form className={styles.form} onSubmit={handleSubmit(handleLogin)}>
        <div className={styles.parent}>
          <div>
            <h1>Login</h1>
          </div>
          <div className={styles.inputContainer}>
            <input
              className={styles.input}
              type="email"
              {...register('email')}
            />
            <i className={styles.icon}>
              <EmailOutlinedIcon />
            </i>
          </div>
          <div className={styles.inputContainer}>
            <input
              className={styles.input}
              type="password"
              {...register('password')}
            />{' '}
            <i className={styles.icon}>
              <VpnKeyOutlinedIcon />
            </i>
          </div>
          {isLoading ? (
            <button className={styles.btn} type="submit">
              <span
                className="spinner-border spinner-border-sm"
                aria-hidden="true"
              ></span>
            </button>
          ) : (
            <button className={styles.btn} type="submit">
              Войти
            </button>
          )}
        </div>
      </form>
    </div>
  )
}

export { Login }
