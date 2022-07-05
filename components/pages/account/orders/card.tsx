import React from 'react'

import styles from '../../../../styles/account/orders.module.sass'

import { Text, Paper } from '../../../../customUI'

export default function OrderCard (data) {

    return (
    <Paper shadow="large" className={styles.orderCard}>
        <Text variant="h6">{data.createdAt}</Text>
        <div className={styles.orderCard__info}>
            <div>
                <Text variant="body2">{data.departmentMethod}</Text>
                <Text variant="body2">{data.paymentMethod}</Text>
            </div>
            <div>
                <Text variant="body2" className={styles.status}>{data.paymentStatus}</Text>
                <Text variant="body1" className={styles.amount}>${data.cartAmount}</Text>
            </div>
        </div>
    </Paper> 
    )

}