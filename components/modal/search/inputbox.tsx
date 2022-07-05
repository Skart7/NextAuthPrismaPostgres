import React from 'react'
import dynamic from 'next/dynamic'

import styles from '../../../styles/modal/search.module.sass'
import {Input, Button} from '../../../customUI'

const SearchRoundedIcon = dynamic(() => import("@mui/icons-material/SearchRounded"))

export default function InputBox ({onChangeValue, searchQuery, onAddQuery}) {

    return (
    <div className={styles.modalWrapperContent}>
        <div className={styles.modalInputBox}>
            <Input 
                variant="clear"
                size="large"
                fullWidth
                name="search"
                placeholder="Search..."
                onChange={onChangeValue}
                value={searchQuery || ""}
            />
            <Button variant="contained" size="small" onClick={onAddQuery}>
                <SearchRoundedIcon fontSize="small" />
            </Button>

        </div>
    </div>
    )

}