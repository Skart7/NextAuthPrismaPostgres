import React from 'react'
import { Button, Text } from '../../../customUI'

import Loading from '../../loading/main'

import axios from 'axios'
import { useAppDispatch, useAppSelector } from '../../../redux/hooks'
import { selectUser } from '../../../redux/slices/user'
import { resetCart, selectCart } from '../../../redux/slices/cart'
import { setSnackbar } from '../../../redux/slices/modal'

import styles from '../../../styles/modal/cart.module.sass'

export default function CartFooter () {

    const [loading, setLoading] = React.useState(false)

    const dispatch = useAppDispatch()

    const cart = useAppSelector(selectCart)
    const user = useAppSelector(selectUser)

    const onCreateOrder = async () => {
        setLoading(true)
        if(user.data.auth) {
            await axios.post('http://localhost:3000/api/order/create', {
                user: {
                    id: user.data.id,
                },
                details: {
                    departmentAdress: 'To My',
                    departmentMethod: 'currier',
                    paymentMethod: 'cash',
                    paymentStatus: 'not paided',
                },
                cart: cart
            })    
            .then(res => {
                if(res.status === 200) {
                    setLoading(false)
                    dispatch(setSnackbar({ severity: "success", message: "Order has been created", show: true }))
                    dispatch(resetCart())
                }
                if(res.status === 401) {
                    setLoading(false)
                    dispatch(setSnackbar({ severity: "error", message: "You are not authorized", show: true }))

                }
                if(res.status === 500) {
                    setLoading(false)
                    dispatch(setSnackbar({ severity: "success", message: "Server Side Error, try later", show: true }))

                }
                // delete cart of user
            })   
        }
    }

    return (
        <>
        {
            loading ? <Loading /> : (
            <div className={styles.cartFooter}>
                <Text className={styles.cartTotalText} variant="h6">Total: ${cart.amount}</Text>
                <Button 
                    variant="contained" 
                    disabled={!user.data.auth}
                    onClick={() => onCreateOrder()}
                >Make Order</Button>
            </div>
            )
        }
        </>
    )
}