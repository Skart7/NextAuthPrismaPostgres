import React from 'react'

import styles from './snackbar.module.sass'

interface iSnackbar {
    children: React.ReactNode,
    open: boolean,
    onClose: () => void
    autoHideDuration?: number
    anchor?: { y: "top" | "bottom", x: "left" | "right" }
}

export const Snackbar = React.forwardRef((props:iSnackbar, ref:any) => {

    const {
        children,
        open = false,
        onClose,
        autoHideDuration = null,
        anchor = { y: "bottom", x: "left" } 
    } = props

    const [active, setActive] = React.useState(false)
    const [visible, setVisible] = React.useState(false)

    React.useEffect(() => {

        if(open) {
            setTimeout(() => setVisible(true), 10)
            setTimeout(() => setActive(true), 100)

            if(autoHideDuration) {
                setTimeout(() => {
                    onClose()
                }, autoHideDuration)
            }
            return
        }        
        setTimeout(() => setActive(false), 10)
        setTimeout(() => setVisible(false), 100)

    }, [open])

    if(!visible) return null

    return (
    <div 
        className={`${styles.snackbar} ${active ? styles.show : styles.hidden} ${styles[anchor.y]} ${styles[anchor.x]}`}
    >
        {children}
    </div>
    )

})

Snackbar.displayName = 'Snackbar'