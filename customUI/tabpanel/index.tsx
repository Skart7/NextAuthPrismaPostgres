import React, { forwardRef } from 'react'

import {useTabValue} from '../tabprovider'

import styles from './tabpanel.module.sass'

interface iTabPanel {
    value: string,
    children: React.ReactNode,
    className?: string,
    sx?: object
}

export const TabPanel = React.forwardRef((props:iTabPanel, ref:any) => {

    const {contextValue} = useTabValue()

    const {
        value = "1",
        children,
        className = "",
        sx,
    } = props

    if(value !== contextValue) return null

    return (
    <div 
        ref={ref}
        className={`${className} ${value === contextValue ? styles.show : styles.hidden} ${styles.tabpanel}`}
        style={{...sx}} 
    >
        {children}
    </div>
    )

})

TabPanel.displayName = 'TabPanel'