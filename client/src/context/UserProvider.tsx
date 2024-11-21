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
    let getUser:User | null={ user: localStorage.getItem('user') || ''}
    if(!getUser.user) getUser=null;
    const [user, setUser] = useState<User|null>(getUser || null)

    function logIn(user: User){
        localStorage.setItem('user', user.user)
        setUser(user)
    }
    function logOut(){
        localStorage.removeItem('user')
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