import { createContext, ReactNode, useState } from "react"

const UserContext = createContext<UserContextType|null>(null)
type UserContextType = {
    user: string | null,
    logIn: (user?: string) => void,
    logOut: () => void,
}
type Props = {
    children: ReactNode
}
export default function UserProvider ({children}: Props){
    // const getUser: Users | null = userInLocal ? userInLocal : null
    
    
    const [user, setUser] = useState<string|null>(() => {
        const userInLocal = localStorage.getItem('user')
        return userInLocal || null;
    })

    function logIn(user?: string){
        const userInLocal = localStorage.getItem('user')
        if(user && !userInLocal) {
            localStorage.setItem('user', user)
            setUser(user)
        }
        else setUser(null)
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