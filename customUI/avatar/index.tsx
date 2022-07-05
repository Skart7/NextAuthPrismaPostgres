import React from 'react'

import styles from './avatar.module.sass'

interface iAvatar {
    color?: "primary" | "secondary",
    variant?: "outlined" | "standard" | "rounded",
    sx?: object,
    children?: React.ReactNode,
    size?: "medium" | "large",
    className?: string
}

export function Avatar ({
    color = "primary",
    variant = "standard",
    children,
    size = "medium",
    className = "",
    sx
}:iAvatar) {
    return (
        <div
            className={`${styles[variant]} ${styles[color]} ${styles[size]} ${className}`}
            style={{...sx}}
        >
            {children}
        </div>
    )
}