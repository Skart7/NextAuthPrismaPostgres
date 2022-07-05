import React from 'react'
import { Button, TabPanel, TextField } from '../../../customUI'
import Router from 'next/router'
import Loading from '../../loading/main'

import styles from '../../../styles/sign.module.sass'
import ButtonGroupAuth from './providers'

import {signIn} from 'next-auth/react'

export default function TabSignIn() {

  const _alert = {msg: "Your Real Email Address", status: "default"}

  const [email, setEmail] = React.useState("")
  const [alert, setAlert] = React.useState(_alert)
  const [loading, setLoading] = React.useState(false)

  const onChangeEmail = (e) => setEmail(e.target.value)

  const onSignIn = async () => {
    if(email) {
      setLoading(true)
      await signIn("credentials", {
        callbackUrl: '/sign',
        redirect: false,
        email: email,
        stage: "signin"
      })
      .then(res => {
        if(res.status === 401) {
          setAlert({ msg: res.error, status: "error" })
          setLoading(false)
        }
        if(res.status === 200) {
          setAlert({ msg: "success", status: "success" })
          Router.push('/')
        }
      }) 
      .catch(err => {
        console.log(err)
        setLoading(false)
      })
    }
  }

  return (
    <TabPanel value="1">
        {loading && <Loading/>}
        <div className={styles.form}>
            <TextField 
              variant="filled" 
              color="primary" 
              placeholder="Email" 
              type="email" 
              size="large" 
              value={email}
              onChange={onChangeEmail}
              textHelper={alert.msg}
              statusHelper={alert.status}
              required 
              fullWidth  
            />
            <Button fullWidth variant="outlined" onClick={onSignIn}>SignIn</Button>
        </div>
        <ButtonGroupAuth styles={styles} />
    </TabPanel>
  )
}
