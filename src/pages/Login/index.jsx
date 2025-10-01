import React from 'react';
import styles from './styles.module.css'
import Body from './components/Body' 

function Login(){
  return(
    <>
      <Body>
        <div className={styles.loginContainer}>
          <div className={styles.loginTitle}>
            <i className="fa-light fa-user"></i>
            <p className={styles.loginTitleText}>Login</p>
          </div>
          <div className={styles.loginForm}>
            <input type="text" />
          </div>
        </div>
      </Body>
    </>
  )
}

export default Login;