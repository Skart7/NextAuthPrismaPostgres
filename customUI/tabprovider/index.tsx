import React from 'react'

interface iProps {
    children: React.ReactNode
}

interface iContextDefaultValue {
    contextValue: string,
    changeValue: (val:string) => void
}

const ContextDefaultValue:iContextDefaultValue = {
    contextValue: "1",
    changeValue: (val) => {}
}

const TabContext = React.createContext<iContextDefaultValue>(ContextDefaultValue)

export function useTabValue () {
    return React.useContext(TabContext)
}

export function TabProvider ({children}:iProps) {

    const [contextValue, setValue] = React.useState(ContextDefaultValue.contextValue)

    const changeValue = (val:string) => {
        setValue(val)
    }

    const value = {
        contextValue, changeValue
    }

    return (
        <TabContext.Provider value={value}>
            {children}
        </TabContext.Provider>
    )
}