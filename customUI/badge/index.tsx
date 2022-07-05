import React from 'react'

import styles from './badge.module.sass'

interface iBadge {
    children: React.ReactChild,
    className?: string,
    sx?: object,
    color?: "primary" | "secondary" | "error" | "success",
    max?: number,
    variant?: "standard",
    showZero?: boolean,
    value?: number
}


export const Badge = React.forwardRef((props:iBadge, ref:any) => {

    const {
        children,
        className = "",
        color = "primary",
        max = null,
        variant = "standard",
        showZero = false,
        value = 0,
        sx 
    } = props

    const [display, setDisplay] = React.useState('block')
    const [content, setContent] = React.useState(0)

    React.useEffect(() => {
        let displayValue

        value === 0 && !showZero ? setDisplay('none') : setDisplay('block') 
        max && Number(value) > max ? displayValue = `${max}+` : displayValue = value

        return setContent(displayValue)

    }, [showZero, value, max])

    return (
    <div className={styles.badgeWrapper} ref={ref}>
        <span 
            className={`${className} ${styles[variant]} ${styles[color]} ${styles[display]}`}
            style={{...sx}}
        >{content}</span>
        {children}
    </div>
    )
})

Badge.displayName = "Badge"