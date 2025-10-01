import React from 'react';
import styles from './styles.module.css'
import Body from './components/Body' 

function Login(){
  return(
    <>
      <Body>
        <div className={styles.loginContainer}>
          <div>
            <i className="fa-light fa-user"></i>
            <h1>Login</h1>
          </div>
          <div>

          </div>
        </div>
      </Body>
    </>
  )
}

export default Login;