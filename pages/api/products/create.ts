import nc from 'next-connect'
import prisma from '../../../prisma'

import {products} from '../../../localdb'

import type {NextApiRequest, NextApiResponse} from 'next'

const handler = nc()

export default handler.get(async (req:NextApiRequest,res:NextApiResponse) => {
    try {

        await prisma.$connect()

        const query = await prisma.product.createMany({
            data: products,
            skipDuplicates: true,
        })

        await prisma.$disconnect()

        res.status(200).json(query)
    }
    catch(e) {
        console.log(e.message)
        
    }
})