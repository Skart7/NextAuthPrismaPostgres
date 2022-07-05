import React from 'react'

import NextLink from 'next/link'
import Image from 'next/image'

import {Text, Button, Paper} from '../../customUI'

import styles from '../../styles/productcard.module.sass'

import { useAppDispatch } from '../../redux/hooks'
import { addToCart } from '../../redux/slices/cart'
import { setSnackbar } from '../../redux/slices/modal'


export default function ProductCard (data) {

  const dispatch = useAppDispatch()
 
  const onAddToCart = () => {
    dispatch(addToCart(data))
    dispatch(setSnackbar({ 
      severity: "success", 
      show: true, 
      message: `${data.title} Has Been Added to Your Cart`
    }))
  }

    return (
    <Paper className={styles.card}>
        <NextLink href="/details/[id]" as={`/details/${data.id}`}>
          <div className={styles.image}>
            <Image
                src={data.image}
                alt={data.title}
                width={120}
                height={100}
                objectFit="contain"
                loading="lazy"
                layout="responsive"
                placeholder="blur"
                blurDataURL={data.image}
            />
          </div>
        </NextLink>
        <Text  className={styles.label} variant="body2" component="h6">{data.title}</Text>
        <Text  className={styles.price} variant="h4">$ {data.price}</Text>
        <Button fullWidth variant="text" onClick={onAddToCart}>Add to Cart</Button>
      </Paper>
    )
}