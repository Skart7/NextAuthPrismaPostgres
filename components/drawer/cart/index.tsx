import React from 'react'
import dynamic from 'next/dynamic'

import {Drawer, IconButton, Text} from '../../../customUI'

const CartList = dynamic(() => import('./list'))
const ArrowForwardIosRoundedIcon = dynamic(() => import('@mui/icons-material/ArrowForwardIosRounded'))

import { useAppSelector, useAppDispatch } from '../../../redux/hooks'
import {selectModal, setModalCart} from '../../../redux/slices/modal'

import styles from '../../../styles/modal/cart.module.sass'

function Cart () {

    const dispatch = useAppDispatch()
    const modal = useAppSelector(selectModal)

    const closeDrawer = React.useCallback(() => {
        dispatch(setModalCart(false))
    }, [])

    return (
    <Drawer open={modal.cart} onClose={closeDrawer} anchor="right" className={styles.cart}>

        <div className={styles.cartHeader}>
            <Text variant="h6">My Cart</Text>
            <IconButton onClick={closeDrawer}><ArrowForwardIosRoundedIcon/></IconButton>
        </div>

        <CartList/>

    </Drawer>
    )
}

export default React.memo(Cart)