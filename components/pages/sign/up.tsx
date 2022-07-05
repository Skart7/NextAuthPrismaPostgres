import React from 'react'
import { Button, TabPanel, TextField } from '../../../customUI'

import styles from '../../../styles/sign.module.sass'
import ButtonGroupAuth from './providers'

import {signIn} from 'next-auth/react'

export default function TabSignUp() {

  const _alert = {msg: "Your Real Email Address", status: "default"}

  const [email, setEmail] = React.useState("")
  const [alert, setAlert] = React.useState(_alert)
  const [loading, setLoading] = React.useState(false)

  const onChangeEmail = (e) => setEmail(e.target.value)

  const onSignUp = async () => {
    if(email) {
      await signIn("credentials", {
        callbackUrl: '/sign',
        redirect: false,
        email: email,
        stage: "signup"
      })
      .then(res => {
        if(res.status === 401) {
          setAlert({ msg: res.error, status: "error" })
        }
        if(res.status === 200) {
          setAlert({ msg: "success", status: "success" })
        }
      }) 
      .catch(err => {
        console.log(err)
      })
    }
  }

  return (
    <TabPanel value="2">
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
            <Button fullWidth variant="outlined" onClick={onSignUp}>SignUp</Button>
        </div>
        <ButtonGroupAuth styles={styles} />
    </TabPanel>
  )
}
