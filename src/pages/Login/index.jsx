import React from 'react';
import { useState } from 'react';
import styles from './styles.module.css'
import Body from './components/Body' 
import { useConst, Input } from '../../components/Input';

function Login(){
  const [password, setPassword, passwordRef] = useConst('');
  return(
    <>
      <Body>
        <div className={styles.loginContainer}>
          <div className={styles.loginTitle}>
            <i className="fa-light fa-user"></i>
            <p className={styles.loginTitleText}>Login</p>
          </div>
          <div className={styles.loginForm}>
            <Input
              label="Senha"
              type="select"
              options={
                [
                  { value: 'admin', label: 'Admin' },
                  { value: 'user', label: 'User' },
                ]
              }
              value={password}
              onChange={setPassword}
              inputRef={passwordRef}
            />
          </div>
        </div>
      </Body>
    </>
  )
}

export default Login;