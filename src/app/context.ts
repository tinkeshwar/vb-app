import React from 'react'

export const UserContext = React.createContext<any>({})
export const UserProvider = UserContext.Provider

export {
    UserContext as default
}