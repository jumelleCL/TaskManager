import { createContext, ReactNode, useState } from "react"

const UserContext = createContext<UserContextType|null>(null)
type UserContextType = {
    user: string,
    logIn: (token?: string) => void,
    logOut: () => void,
}
type Props = {
    children: ReactNode
}
export default function UserProvider ({children}: Props){
    const token = localStorage.getItem('token')
    const getUser:string= token ? token : ''
    const [user, setUser] = useState<string>(getUser)

    function logIn(token?: string){
        const tokenInLocal = localStorage.getItem('token')
        if(token && !tokenInLocal) {
            localStorage.setItem('token', token)
            setUser(token)
        }
        else setUser('')
    }
    function logOut(){
        localStorage.removeItem('token')
        setUser('')
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