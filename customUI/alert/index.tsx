import React from 'react'

import styles from './alert.module.sass'

interface iAlert {
    children: string,
    className?: string,
    sx?: object,
    severity?: "success" | "error" | "warning" | "info",
    variant?: "filled" | "outlined" | "text",
    show: boolean,
}

export const Alert = React.forwardRef((props:iAlert, ref:any) => {

    const {
        sx,
        children = "",
        className = "",
        severity = "success",
        variant = "filled",
        show = true,
    } = props

    return (
    <>
        {
            show && (
                <div 
                    ref={ref}
                    style={{...sx}}
                    className={`${styles.alert} ${styles[variant]} ${styles[severity]} ${className}`}
                >
                    <p className={`${styles.textContent} ${styles[variant]} ${styles[severity]}`}>{children}</p>
                </div>
            )
        }
    </>
    )
})

Alert.displayName = "Alert"