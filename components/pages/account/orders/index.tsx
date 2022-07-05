import React from 'react'

import OrderCard from './card'
import styles from '../../../../styles/account/orders.module.sass'

import { useAppDispatch, useAppSelector } from '../../../../redux/hooks'
import { fetchOrder, selectOrder } from '../../../../redux/slices/order'
import Loading from '../../../loading/main'
import { Text } from '../../../../customUI'

export default function OrderList () {

    const dispatch = useAppDispatch()
    const {status, data, message} = useAppSelector(selectOrder)

    React.useEffect(() => {
        dispatch(fetchOrder())
    }, [])

    if(status === 'loading') return <Loading/>
    if(status === 'error') return <div>{message}</div>

    return (
    <div className={styles.layoutPage}>
        {
            data && data.length > 0 ?
            <div className={styles.wrapperCards}>
                {
                    data.map(item => <OrderCard key={item.id} {...item} />)
                }
            </div>
            : 
            <div className={styles.wrapperEmpty}>
                <Text variant="caption">You don`t have any orders</Text>
            </div>
        }
    </div>
    )

} 