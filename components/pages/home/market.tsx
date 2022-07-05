import React from 'react'
import dynamic from 'next/dynamic'
import ProductCardSkeleton from '../../products/skeleton'

const NextLink = dynamic(() => import("next/link"))
import styles from '../../../styles/market.module.sass'
import { Text } from '../../../customUI'

const ProductCard = dynamic(() => import("../../products/default"), { loading: () => <ProductCardSkeleton/> })

export default function Market ({items}) {

    return (
    <>
        {
            items.length > 0 ? (
            <div className={styles.wrapperMarket}>
                {
                    items.map(obj => (
                        <ProductCard key={obj.id} {...obj} />
                    )) 
                }
            </div>
            ) : (
            <div className={styles.wrapperEmpty}>
                <Text variant="caption">Opps... Products is not found... Try to create them: <NextLink href="/api/products/create">Link</NextLink></Text>
            </div>
            )
        }
    </>

    )    
}