import React from 'react'

import styles from './button.module.sass'

interface iButton {
    color?: "primary" | "secondary" | "error" | "success",
    variant?: "outlined" | "contained" | "text",
    fullWidth?: boolean,
    children: React.ReactNode,
    disabled? : boolean,
    sx?: object,
    className?: string,
    size?: "small" | "medium" | "large",
    onClick?: (e:any) => void
}

export const Button = (
    {   
        color = "primary", 
        variant = "text", 
        fullWidth = false, 
        children, 
        disabled = false, 
        className,
        size = 'medium',
        onClick = () => {},
        sx
    }:iButton
    ) => {

    return (
    <>
        <button 
            className={` ${styles[variant]} ${styles[color]} ${styles[size]} ${fullWidth ? styles.fullWidth : ""} ${className}`}
            disabled={disabled} 
            style={{...sx}}
            onClick={onClick}
        >
            {children}
        </button>
    </>
    )
}