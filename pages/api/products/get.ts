import nc from 'next-connect'
import prisma from '../../../prisma'

import type {NextApiRequest, NextApiResponse} from 'next'

const handler = nc()

export default handler.post(async (req:NextApiRequest,res:NextApiResponse) => {
    try {
        const {take, skip} = req.body
        await prisma.$connect()
        const query = await prisma.product.findMany({take: take,skip: skip})
        await prisma.$disconnect()
        return res.status(200).json(query)
    }
    catch(e) {
        console.log(e.message)
        
    }
})