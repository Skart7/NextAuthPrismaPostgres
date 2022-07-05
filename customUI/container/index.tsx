import React from 'react'

import styles from './container.module.sass'

interface iContainer {
    children: React.ReactNode,
    className?: string,
    sx?: object,
    maxWidth?: "lg" | "md" | "sm" | "xs" | "xl"
}

export const Container = React.forwardRef((props:iContainer, ref:any) => {

    const {
        children,
        className = "",
        maxWidth = "lg",
        sx,

    } = props

    return (
    <>
    <div 
        style={{...sx}}
        className={`${className} ${styles[maxWidth]}`}
    >
        {children}
    </div>  
    </>
    )
})

Container.displayName = "Container"