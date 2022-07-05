import React from 'react'

import {Loader} from '../../customUI'

export default function Loading() {
    return (
    <div style={{ position: 'fixed',top: '50%',left: '50%',transform: 'translate(-50%, -50%)', zIndex: 5000 }}>
        <Loader size="large" />
    </div>
    )
}