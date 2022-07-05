import jwt from 'jsonwebtoken'

import prisma from '../prisma'

export const createAccessToken = async (user) => {
    return await jwt.sign(
        { sub: user.sub || user.id }, 
        process.env.SECRET_KEY,
        { expiresIn: '5m' }
    )
}

export const encodeToken = async ({token, secret, maxAge}) => {
    return await jwt.sign({
        sub: token.user.sub,
        name: token.user.name,
        image: token.user.image,
        email: token.user.email,
        accessToken: token.accessToken
    }, secret, { expiresIn: maxAge })
}
export const decodeToken = async ({token,secret}) => {
    return await jwt.verify(token, secret)
}

export const newSession = async ({user, account, token}) => {

    let query

    const accessToken = await createAccessToken(user)

    await prisma.$connect()

    const existAccount = await prisma.account.findFirst({
        where: { user: { id: user.id } },
    })

    if(existAccount) {
        query = await prisma.account.update({
            where: { id: existAccount.id },
            data: { access_token: accessToken },
            include: { user: true }
        })
    }
    else {
        query = await prisma.account.create({
            data: {
                user: { connect: { id: user.id} },
                access_token: accessToken,
                type: account.type,
                provider: account.provider,
                providerAccountId: account.providerAccountId,
            },
            include: { user: true }
        })
    }

    await prisma.$disconnect()
    
    return {
        ...token,
        accessToken: query.access_token,
        user: {
            sub: query.user.id,
            email: query.user.email,
            image: query.user.image,
            name: query.user.name,
        }
    }
}

export const updateSession = async (token) => {        

    await prisma.$connect()

    const existAccount = await prisma.account.findFirst({
        where: { 
            access_token: token.accessToken
        }
    })    

    if(!existAccount) {
        return {
            token: null
        }
    }

    const response = await createAccessToken(token)

    const query = await prisma.account.update({
        where: { id: existAccount.id },
        data: {
            access_token: response
        },
        include: {
            user: true
        }
    })
    
    await prisma.$disconnect()
    
    return {
        ...token,
        accessToken: query.access_token,
        user: {
            sub: query.user.id,
            email: query.user.email,
            image: query.user.image,
            name: query.user.name
        }
    }
}

