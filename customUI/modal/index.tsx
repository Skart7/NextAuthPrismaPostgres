import React from 'react'

import styles from './modal.module.sass'

interface iModal {
    open: boolean,
    onClose: () => void,
    children: React.ReactNode,
    animate?: "fade" | "zoom",
    className?: string
}

export const Modal = React.forwardRef((props:iModal, ref:any) => {

    const {
        open = false,
        onClose,
        children,
        animate = "fade",
        className = ""
    } = props

    const [active, setActive] = React.useState(false)
    const [visible, setVisible] = React.useState(false)

    React.useEffect(() => {
        
        if(open) {
            setTimeout(() => setVisible(true), 10)
            setTimeout(() => setActive(true), 100)

            const widthScroll = window.innerWidth - document.body.offsetWidth
    
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
            className={`${styles.modalOverlay} ${active ? styles.show : styles.hidden}`} 
            onClick={onClose}
        >
            <div className={`${className} ${styles[animate]}  ${active ? styles.show : styles.hidden}`} onClick={(e) => e.stopPropagation()}>
                {children}
            </div>
        </div>
    )

})

Modal.displayName = "Modal"
