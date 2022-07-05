import React from 'react'
import dynamic from 'next/dynamic'
const Layout = dynamic(() => import("../components/layout"))
const Market = dynamic(() => import("../components/pages/home/market"))

import axios from 'axios'

function MainPage ({items}) {            

    return (
    <Layout>
        <Market items={items} />
    </Layout>
    )
}

export const getServerSideProps = async ctx => {
    const {data} = await axios.post('http://localhost:3000/api/products/get', { take: 10, skip: 0 })
        
        if(data) {

            return {
                props: {
                    items: data
                }
            }
        }

    return {
        props: {}
    }
}

export default MainPage
