import React from 'react'

import {Paper, Skeleton} from '../../customUI'

import styles from '../../styles/productcard.module.sass'

export default function ProductCardSkeleton () {

    return (
    <Paper className={styles.card}>
        <Skeleton variant="rectangular" />
        <Skeleton variant="text" />
        <Skeleton variant="text" />
      </Paper>
    )
}