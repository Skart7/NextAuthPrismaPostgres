import React from 'react'

import styles from './paper.module.sass'

interface iPaper {
    sx?: object,
    children: React.ReactNode
    variant?: "standard" | "rounded",
    shadow?: "small" | "medium" | "large",
    className?: string,
    onClick?: () => void
}

export const Paper = React.forwardRef((props:iPaper, ref:any) => {

    const {
        sx, 
        children,
        variant = "rounded",
        shadow = "small",
        className,
        onClick = () => {}
    } = props

    return (
        <div
        ref={ref}
        style={{...sx}}
        className={`${styles[variant]} ${styles[shadow]} ${className}`}
        onClick={onClick}
    >
        {children}
    </div>
    )
})

Paper.displayName = "Paper"