import React from 'react'
import { IconButton, Text } from '../../../customUI'
import dynamic from 'next/dynamic'

const DeleteSweepRoundedIcon = dynamic(() => import("@mui/icons-material/DeleteSweepRounded"))
const RestoreRoundedIcon = dynamic(() => import("@mui/icons-material/RestoreRounded"))
const CloseRoundedIcon = dynamic(() => import('@mui/icons-material/CloseRounded'))

import styles from '../../../styles/modal/search.module.sass'

import {selectSearch, removeQuery, resetQuerys} from '../../../redux/slices/search'
import { useAppDispatch, useAppSelector } from '../../../redux/hooks'

export const RecentCard = (data) => {

    const dispatch = useAppDispatch()

    const onRemoveQuery = () => dispatch(removeQuery(data.label))

    return (
        <div className={styles.card}>
            <div className={styles.cardImage}>
                <RestoreRoundedIcon className="captionFill" />
            </div>
            <div className={styles.cardInfo}>
                <Text variant="body2">{data.label}</Text>
            </div>
            <div className={styles.cardAction}>
                <IconButton onClick={onRemoveQuery}><CloseRoundedIcon className="captionFill" /></IconButton>
            </div>
        </div>
    )
}

const RecentList = () => {

    const dispatch = useAppDispatch()

    const {recentQuerys} = useAppSelector(selectSearch)

    const onResetQuerys = () => dispatch(resetQuerys())

    return (
    <>
        {
            recentQuerys.length > 0 && (
            <>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Text variant="caption">Recent</Text>
                    <IconButton onClick={onResetQuerys}>
                        <DeleteSweepRoundedIcon className='captionFill' fontSize="small" />
                    </IconButton>
                </div>
                <div className={styles.modalWrapperList}>
                        
                {
                    recentQuerys.map((data, index) => (
                        <RecentCard key={index} {...data} />
                    ))
                }

                </div>
            </>
            )
        }
    </>
    )
}
export default RecentList
