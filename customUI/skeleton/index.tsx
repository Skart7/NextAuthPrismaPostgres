import React from 'react'

import styles from './skeleton.module.sass'

interface iSkeleton {
    className?: string,
    sx?: object,
    variant?: "text" | "circular" | "rectangular",
}

export const Skeleton = React.forwardRef((props:iSkeleton, ref:any) => {

    const {
        className,
        sx,
        variant = "text"
    } = props

    return (
        <div
            className={`${styles.skeleton} ${className} ${styles[variant]}`}
            style={{...sx}}
        ></div>
    )

})

Skeleton.displayName = "Skeleton"