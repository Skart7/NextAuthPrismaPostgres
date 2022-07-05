import React from 'react'

import {Tab} from '../tab'

import styles from './tablist.module.sass'

interface iButtonTabs {
    listArray: {label: string, value: string}[],
    className?: string
}


export const TabList = React.forwardRef((props:iButtonTabs, ref:any) => {

    const {listArray, className = ""} = props

    return (
    <div
        ref={ref}
        className={`${className} ${styles.tablist}`}
    >
            {listArray.map(item => (
                <Tab value={item.value} label={item.label} key={item.value} />
            ))}
    </div>
    )

})

TabList.displayName = "TabList"