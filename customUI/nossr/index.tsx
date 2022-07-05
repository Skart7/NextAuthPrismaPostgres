import React from 'react'


interface iNoSsr {
    children: React.ReactNode,
    fallback?: React.ReactNode,
    defer?: boolean
}

export function NoSsr ({children, fallback = null, defer = false}:iNoSsr) {

    const [mount, setMount] = React.useState(false)

    React.useEffect(() => {
        if(!defer) {
            setMount(true)
        }
    }, [defer])

    return <>{mount ? children : fallback}</>
}