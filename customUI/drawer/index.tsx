import React from 'react'

import styles from './drawer.module.sass'

interface iDrawer {
    anchor?: "left" | "right",
    children: React.ReactNode,
    sx?: object,
    className?: string,
    open: boolean,
    onClose: () => void,
}

export const Drawer = React.forwardRef((props:iDrawer, ref:any) => {

    const {
        open = false,
        children,
        sx,
        className = "",
        anchor = "left",
        onClose,
    } = props

    const [active, setActive] = React.useState(false)
    const [visible, setVisible] = React.useState(false)


    React.useEffect(() => {
        if(open) {
            const widthScroll = window.innerWidth - document.body.offsetWidth

            setTimeout(() => setVisible(true), 10)
            setTimeout(() => setActive(true), 100)
    
            document.body.style.cssText = `
                overflow: hidden;
                width: 100%;
                height: 100%;
                padding-right: ${widthScroll}px;   
            `
            return
        }
        setTimeout(() => setActive(false), 10)        
        setTimeout(() => setVisible(false), 100)

        document.body.style.cssText = `
            overflow-y: scroll;
            width: 100%;
            height: 100%;
            padding-right: 0;
        `
    }, [open])
    
    if(!visible) return null

    return (
        <div 
            ref={ref}
            className={`${styles.drawerOverlay} ${active ? styles.show : styles.hidden}`} 
            onClick={onClose}
        >
            <div 
                className={`${styles[anchor]} ${className} ${active ? styles.show : styles.hidden}`} 
                style={{...sx}} 
                onClick={(e) => e.stopPropagation()}
            >{children}</div>
        </div>
    )

})

Drawer.displayName = "Drawer"