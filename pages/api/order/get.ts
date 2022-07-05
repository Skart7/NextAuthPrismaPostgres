import nc from 'next-connect'
import prisma from '../../../prisma'
import { NextApiRequest, NextApiResponse } from 'next'

const handler = nc()

export default handler.post( async(req:NextApiRequest,res:NextApiResponse) => {
    try{
        const { user } = req.body        

        if(!user.id) {
            return res.status(401).json({data: null, message: "You are not autorized"});
        }
        await prisma.$connect()

        const query = await prisma.order.findMany({
            where: { user: { id: user.id } },
            include: { cart: true }
        })

        await prisma.$disconnect()

        return res.status(200).json({data: query, message: "success"})
    }
    catch(e) {
        console.log(e.message)
        return res.status(500).json({data: null, message: "Server Side Error"})
    }
})