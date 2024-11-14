import { createContext, ReactNode, useState } from "react"

const UserContext = createContext<UserContextType|null>(null)
type UserContextType = {
    user: User|null,
    logIn: (user: User) => void,
    logOut: () => void,
}
export type User = {
    user: string,
}
type Props = {
    children: ReactNode
}
export default function UserProvider ({children}: Props){
    const [user, setUser] = useState<User|null>(null)

    function logIn(user: User){
        //buscar en la bd?
        setUser(user)
    }
    function logOut(){
        setUser(null)
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