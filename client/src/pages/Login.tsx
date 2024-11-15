import { useRef } from "react";
import Button from "../components/design/Button";
import Input from "../components/design/Input";
import { User } from "../context/UserProvider";
import useUserContext from "../hooks/UseUserContext";

export default function Login (){
    const userContext = useUserContext();
    const inputRef = useRef<HTMLInputElement | null>(null);
    function handleLogin(){
        const name = inputRef.current?.value;
        if(!name)return
        const user: User = {
            user: name
        }
        userContext.logIn(user)
    }
  return(
    <div className="bg-slate-400 rounded p-8 flex flex-col items-center justify-center gap-4">
        <h2 className="text-slate-700 font-bold text-3xl tracking-widest">Login</h2>
        <form className="flex flex-col justify-center">
            <Input ref={inputRef} label="Username" type="text"/>
            <Input label="Password" type="password"/>
            <Button onClick={handleLogin} type="submit" text="Log In"/>
        </form>
    </div>
  )
}
