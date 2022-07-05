import nc from 'next-connect'
import prisma from '../../../prisma'
import { NextApiRequest, NextApiResponse } from 'next'

const handler = nc()

export default handler.post(async(req:NextApiRequest,res:NextApiResponse) => {
    try {
        const {user, cart, details} = req.body

        if(!user.id || !cart) {
            return res.status(401).json({message: "bad request"})
        }

        const cartItems = cart.items.map(item => ({
            totalQty: item.count,
            totalPrice: item.totalPrice,
            title: item.title,
            image: item.image,
            productId: item.id
        }))

        await prisma.$connect()

        const craeteOrder = await prisma.order.create({
            data: {
                user: { connect: { id: user.id } },
                departmentMethod: details.departmentMethod,
                departmentAdress: details.departmentAdress,
                paymentMethod: details.paymentMethod,
                paymentStatus: details.paymentStatus,
                cartQty: cart.qty,
                cartAmount: cart.amount,
                cart: {
                    create: cartItems
                } 
            }
        })

        await prisma.$disconnect()

        console.log(craeteOrder, 'craeteOrder')

        if(!craeteOrder) {
            return res.status(500).json({message: "bad request [2]"})
        }
        return res.status(200).json({message: 'success'})
    }
    catch(e) {
        console.log(e.message)
        
    }
})