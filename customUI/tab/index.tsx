import React from 'react'

import styles from './tab.module.sass'

import {useTabValue} from '../tabprovider'

interface iTab {
    value: string,
    label: string,
}

export const Tab = React.forwardRef((props:iTab, ref:any) => {

    const {contextValue, changeValue} = useTabValue()

    const {value, label} = props

    return (
    <button 
        onClick={() => changeValue(value)} 
        ref={ref}
        className={`${styles.tab} ${value === contextValue ? styles.active : ""}`}
    >{label}</button>
    )
})

Tab.displayName = "Tab"