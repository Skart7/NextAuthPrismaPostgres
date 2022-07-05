import React from 'react'

import styles from './fab.module.sass'

interface iFab {
    children: React.ReactChild | string,
    className?: string,
    sx?: object,
    size?: "small" | "medium" | "large",
    color?: "primary" | "secondary" | "error" | "success" | "info" | "warning",
    onClick?: () => void
}

export const Fab = React.forwardRef((props:iFab, ref:any) => {

    const {
        sx,
        children,
        size = "medium",
        color = "primary",
        className = "",
        onClick
    } = props

    return (
    <button 
        ref={ref}
        style={{...sx}}
        className={`${className} ${styles.fab} ${styles[color]} ${styles[size]}`}
        onClick={onClick}
    >
        {children}
    </button>
    )
})

Fab.displayName = 'Fab'