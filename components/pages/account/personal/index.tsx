import React from 'react'
import { Button, Input } from '../../../../customUI'

import styles from '../../../../styles/account/personal.module.sass'

export default function AccountDetails () {

    return (
    <div className={styles.wrapperContent}>

        <div className={styles.wrapperDetails}>
            <Input 
                type='email'
                variant='outlined'
                label='Email'
                value="example@gmail.com"
                required
                name="email"
                fullWidth
            />
            <Button fullWidth>Save</Button>
        </div>
        <div className={styles.wrapperDetails}>
            <Button variant="outlined" color="error" fullWidth>Log Out</Button>
        </div>

    </div>
    )
}