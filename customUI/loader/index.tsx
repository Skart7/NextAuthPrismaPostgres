import React from 'react'

import styles from './loader.module.sass'

interface iLoader {
    size?: "small" | "medium" | "large",
    color?: "primary" | "secondary"
}

export const Loader = React.forwardRef((props:iLoader, ref:any) => {

    const {
        size = "medium",
        color = "primary"
    } = props

    return (
        <div ref={ref} className={`${styles.loader} ${styles[size]} ${styles[color]}`}></div>
    )

})

Loader.displayName = 'Loader'