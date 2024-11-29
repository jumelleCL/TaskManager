import { createContext, ReactNode, useState } from "react"

const UserContext = createContext<UserContextType|null>(null)
type UserContextType = {
    user: boolean,
    logIn: (token?: string) => void,
    logOut: () => void,
}
type Props = {
    children: ReactNode
}
export default function UserProvider ({children}: Props){
    const getUser:boolean=localStorage.getItem('token') ? true : false
    const [user, setUser] = useState<boolean>(getUser)

    function logIn(token?: string){
        const hasToken = localStorage.getItem('token') ? true : false
        if(token && !hasToken) {
            localStorage.setItem('token', token)
            setUser(true)
        }
        else setUser(hasToken)
    }
    function logOut(){
        localStorage.removeItem('token')
        setUser(false)
    }

    const userContextValues = {
        user,
        logIn,
        logOut,
    }

    return (
        <UserContext.Provider value={userContextValues}>
            {children}
        </UserContext.Provider>
    )
  
}

export {UserContext}