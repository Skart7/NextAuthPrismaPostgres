import React from 'react'
import dynamic from 'next/dynamic'

const CardProduct = dynamic(() => import('./card'))
const CartFooter = dynamic(() => import('./footer'))

import { Text } from '../../../customUI'

import { useAppSelector } from '../../../redux/hooks'
import {selectCart} from '../../../redux/slices/cart'

import styles from '../../../styles/modal/cart.module.sass'

export default function CartList () {

    const cart = useAppSelector(selectCart)

    if(cart.items.length > 0) {
        return (
        <>
            <div className={styles.cartList}>
                {cart.items.map(data => (<CardProduct key={data.id} {...data} />))}
            </div>
            <CartFooter/>
        </>
        )
    } 

    return <div className={styles.cartEmpty}><Text variant="caption">Your Cart is empty :/</Text></div>
}