import React from 'react'
import dynamic from 'next/dynamic'
import Image from 'next/image'

const CloseRoundedIcon = dynamic(() => import('@mui/icons-material/CloseRounded'))
const RemoveRoundedIcon = dynamic(() => import('@mui/icons-material/RemoveRounded'))
const AddRoundedIcon = dynamic(() => import('@mui/icons-material/AddRounded'))

import { IconButton, Paper, Text } from '../../../customUI'

import { useAppDispatch } from '../../../redux/hooks'
import {deleteFromCart, removeFromCart, addToCart} from '../../../redux/slices/cart'

import styles from '../../../styles/modal/cart.module.sass'

export default function CardPorduct (data) {

    const dispatch = useAppDispatch()

    const onDeleteProduct = () => {
        dispatch(deleteFromCart(data))
    }
    const onDeincrementProduct = () => {
        dispatch(removeFromCart(data))
    }
    const onIncrementProduct = () => {
        dispatch(addToCart(data))
    }

    return (
    <Paper shadow="large" key={data.id} className={styles.card}>
        <div className={styles.cardDelete}>
            <IconButton onClick={onDeleteProduct}><CloseRoundedIcon /></IconButton>
        </div>
        <div className={styles.cardImage}>
            <Image
                src={data.image}
                alt={data.title}
                width={50}
                height={50}
                objectFit="contain"
                loading="lazy"
                layout="responsive"
                placeholder="blur"
                blurDataURL={data.image}
            />
        </div>
        <div>
            <Text variant="caption">{data.title}</Text>
            <div className={styles.cardContentPrice}>
                <Text className={styles.price} variant="h6">${data.price}</Text>
                <Text className={styles.qty} variant="body1">x{data.count}</Text>
            </div>
            <div className={styles.cardActionButton}>
                <IconButton onClick={onDeincrementProduct}><RemoveRoundedIcon fontSize="small" /></IconButton>
                <IconButton onClick={onIncrementProduct}><AddRoundedIcon fontSize="small" /></IconButton>
            </div>
        </div>
    </Paper>
    )

}