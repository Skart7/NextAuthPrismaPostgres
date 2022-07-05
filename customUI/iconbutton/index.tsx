import React from 'react'

import styles from './iconbutton.module.sass'

interface iIconButton {
    children: React.ReactChild,
    className?: string,
    disabled?: boolean,
    sx?: object,
    onClick?: () => void
}

export const IconButton = React.forwardRef((props:iIconButton, ref:any) => {

    const {
        children,
        className = "",
        disabled = false,
        onClick,
        sx
    } = props

    return (
        <button 
            ref={ref}
            disabled={disabled}
            className={`${styles.button} ${className}`}
            style={{...sx}}
            onClick={onClick}
        >
            {children}
        </button>
        )
})

IconButton.displayName = 'IconButton'