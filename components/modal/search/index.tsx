import React from 'react'
import dynamic from 'next/dynamic'

const InputBox = dynamic(() => import("./inputbox"))
const RecentList = dynamic(() => import("./recentlist"))
const QueryList = dynamic(() => import("./querylist"))

import styles from '../../../styles/modal/search.module.sass'

import {Modal, IconButton} from '../../../customUI'

import { useAppDispatch, useAppSelector } from '../../../redux/hooks'
import {selectModal, setModalSearch} from '../../../redux/slices/modal'
import {setQuery} from '../../../redux/slices/search'

const CloseRoundedIcon = dynamic(() => import('@mui/icons-material/CloseRounded'))

function Search () {

    const dispatch = useAppDispatch()
    const {search} = useAppSelector(selectModal)

    const [searchQuery, setSearchQuery] = React.useState(null)

    const onClose = React.useCallback(() => {
        dispatch(setModalSearch(false))
    }, [])

    const onAddQuery = () => dispatch(setQuery(searchQuery)) 

    const onChangeValue = (e) => setSearchQuery(e.target.value)

    return (
    <Modal open={search} onClose={onClose} className={styles.modal} animate="fade">

        <div className={styles.modalHeader}>
            <IconButton onClick={onClose}><CloseRoundedIcon/></IconButton>
        </div>

        <InputBox 
            searchQuery={searchQuery}
            onChangeValue={onChangeValue}
            onAddQuery={onAddQuery}
        />

        {
            !searchQuery ? 
            <RecentList/> : 
            <QueryList/>
        }

    </Modal>
    )
}

export default React.memo(Search)