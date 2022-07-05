import React from 'react'

import styles from './input.module.sass'

interface iInput {
    color?: "primary" | "secondary" | "success" | "error",
    variant?: "outlined" | "standard" | "clear",
    fullWidth?: boolean,
    disabled? : boolean,
    type?: "text" | "email" | "number" | "password" | "search" | "tel" | "url" | "hidden",
    required?: boolean,
    readOnly?: boolean,
    sx?: object,
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void,
    value?: string,
    placeholder?: string,
    name?: string,
    className?: string,
    size?: "small" | "medium" | "large",
    label?: string
}

export function Input ({
    color = "primary", 
    variant = "standard", 
    fullWidth = false, 
    disabled = false, 
    required = false,
    readOnly = false,
    type = "text",
    onChange = () => {},
    value = "",
    placeholder = undefined,
    name = undefined,
    className,
    size = "medium",
    sx,
    label = undefined
}:iInput) {
    return (
    
        <div className={styles.inputArea}>
            <input
                type={type}
                disabled={disabled}
                required={required}
                readOnly={readOnly}
                onChange={onChange}
                value={value}
                placeholder={!label && placeholder ? placeholder : undefined}
                name={name}
                className={`${styles[variant]} ${styles[color]} ${styles[size]} ${fullWidth ? styles.fullWidth : ""} ${className}`}
                style={{...sx}}
            />
            { label && <label className={`${styles.label} ${styles[size]}`}>{label}</label> }
        </div>

    )
}