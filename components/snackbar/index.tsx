import React from 'react'
import dynamic from 'next/dynamic'

const CloseRoundedIcon = dynamic(() => import('@mui/icons-material/CloseRounded'))

import { Snackbar, Alert, IconButton } from '../../customUI'

import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import {selectModal, resetSnackbar} from '../../redux/slices/modal'

export default function SnackbarAlert () {

    const dispatch = useAppDispatch()

    const {snackbar} = useAppSelector(selectModal)

    const onClose = () => dispatch(resetSnackbar())

    return (
    <Snackbar open={snackbar.show} onClose={onClose} autoHideDuration={4500} anchor={{ y: 'top', x: 'left' }}>
       <div style={{ display: 'flex', alignItems: 'center' }}>
        <Alert show={snackbar.show} variant="text" severity={snackbar.severity}>{snackbar.message}</Alert>
        <IconButton onClick={onClose}><CloseRoundedIcon/></IconButton>
       </div>
    </Snackbar>
    )
}