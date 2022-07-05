import React from 'react'
import { Button } from '../../../customUI'

import {signIn} from 'next-auth/react'

export default function ButtonGroupAuth({styles}) {

    return (
    <div className={styles.providers}>
        <Button 
            fullWidth 
            variant="contained" 
            color="primary" 
            onClick={() => signIn("google")}
        >SignIn with Google</Button>
        <Button 
            fullWidth 
            variant="contained" 
            color="secondary" 
            onClick={() => signIn("facebook")}
        >SignIn with Facebook</Button>
    </div>
    )
}
