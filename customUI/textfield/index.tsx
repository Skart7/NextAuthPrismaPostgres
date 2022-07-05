import React from 'react'

import styles from './textfield.module.sass'

interface iTextField {
    type?: string,
    required?: boolean,
    readOnly?: boolean
    color?: "primary" | "secondary" | "success" | "error",
    variant?: "standard" | "filled",
    fullWidth?: boolean,
    disabled? : boolean,
    sx?: object,
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void,
    value?: string,
    placeholder?: string,
    name?: string,
    className?: string,
    size?: "small" | "medium" | "large",
    textHelper?: string,
    statusHelper?: "default" | "error" | "success" | string
}

export const TextField = React.forwardRef((props:iTextField, ref:any) => {

    const {
        type = "text",
        value,
        name,
        placeholder = "",
        className = "",
        size = "medium",
        color = "primary",
        variant = "filled",
        required = false,
        readOnly = false,
        disabled = false,
        fullWidth = false,
        onChange,
        textHelper,
        statusHelper = "default",
        sx
    } = props

    return (
    <div className={`${className} ${styles.inputGroup} ${fullWidth ? styles.fullWidth : ""}`} style={{...sx}}>
        <div className={styles.inputWrapp}>
            <input 
                type={type}
                required={required}
                disabled={disabled}
                readOnly={readOnly}
                className={`${styles[variant]} ${styles[size]} ${styles[color]}`}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                name={name}
            />
            <label className={`${styles.label} ${styles[color]}`}>{placeholder}</label>
            <p className={`${styles.textHelper} ${styles[statusHelper]}`}>{textHelper}</p>
        </div>
    </div>
    )

})

TextField.displayName = 'TextField'