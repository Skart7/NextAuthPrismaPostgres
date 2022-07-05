import React from 'react'

import Layout from '../components/layout'
import TabSignIn from '../components/pages/sign/in'
import TabSignUp from '../components/pages/sign/up'
import { Paper, TabList, TabProvider } from '../customUI'

import styles from '../styles/sign.module.sass'

export default function SignPage() {

    const [listArray] = React.useState([
        {value: "1", "label": "signIn"},
        {value: "2", "label": "signUp"}
    ])

    return (
        <Layout>
            <div className={styles.layoutPage}>

                <Paper shadow="large" className={styles.boxWrapper}>
                    <TabProvider>
                        <TabList listArray={listArray} />
                        <TabSignIn />
                        <TabSignUp />
                    </TabProvider>
                </Paper>

            </div>
        </Layout>
    )
}