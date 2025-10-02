import React from 'react';
import { useState } from 'react';
import styles from './styles.module.css'
import Body from './components/Body' 
import { useConst, Input } from '../../components/Input';
import Button from '../../components/Button';

function Login(){
  const [password, setPassword, passwordRef] = useConst('');
  const [email, setEmail, emailRef] = useConst('');
  return(
    <>
      <Body>
        <div className={styles.loginContainer}>
          <div className={styles.loginTitle}>
            <i className="fa-light fa-user"></i>
            <p className={styles.loginTitleText}>Login</p>
          </div>
          <div className={styles.loginForm}>
            <div className={styles.loginFormInputs}>
              <Input
                label="E-mail"
                type="email"
                value={email}
                onChange={setEmail}
                inputRef={emailRef}
              />
              <Input
                label="Senha"
                type="password"
                value={password}
                onChange={setPassword}
                inputRef={passwordRef}
              />
            </div>
            <div className={styles.loginFormInputs}>
              <Input
                label="E-mail"
                type="email"
                value={email}
                onChange={setEmail}
                inputRef={emailRef}
              />
            </div>
            <div className={styles.loginFormInputs}>
              <Button
                label="Entrar"
                type="outline"
                icon="fa-light fa-arrow-right"
                onClick={() => {
                  console.log(email, password);
                }}
              />
            </div>
          </div>
        </div>
      </Body>
    </>
  )
}

export default Login;
