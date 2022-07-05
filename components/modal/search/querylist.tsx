import React from 'react'
import { Text } from '../../../customUI'
import Image from 'next/image'

import {products} from '../../../localdb'
import styles from '../../../styles/modal/search.module.sass'

export const QueryCard = (data) => {
    return (
        <div className={styles.card}>
            <div className={styles.cardImage}>
                <Image
                    src={data.image}
                    alt={data.label}
                    width={60}
                    height={60}
                    objectFit="contain"
                    loading="lazy"
                    layout="responsive"
                    placeholder="blur"
                    blurDataURL={data.image}
                />
            </div>
            <div className={styles.cardInfo}>
                <Text variant="body2" className={styles.cardInfoLabel}>{data.label}</Text>
                <Text variant="body2">${data.price}</Text>
            </div>
        </div>
    )
}

const QueryList = () => {

    return (
    <>
        <Text variant="caption">Response</Text>
        <div className={styles.modalWrapperList}>
                
        {
            products.map((data, index) => (
                <QueryCard key={index} {...data} />
            ))
        }

        </div>
    </>
    )
}
export default QueryList
