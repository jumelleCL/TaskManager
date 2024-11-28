import { useRef } from "react";
import Button from "../design/Button";
import Input from "../design/Input";
import { User } from "../../context/UserProvider";
import useUserContext from "../../hooks/UseUserContext";
import axiosApi from "../../config/axiosApi";

export default function Register() {
  const userContext = useUserContext();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const emailRef = useRef<HTMLInputElement | null>(null);
  const pswRef = useRef<HTMLInputElement | null>(null);
  function handleLogin(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault()
    const data = {
      user: inputRef.current?.value,
      password: pswRef.current?.value,
      email: emailRef.current?.value,
    }
    axiosApi
      .post(`/api/users/register`, data)
      .then((resp) => {
        if (resp.data && data.user) {
            const user: User = {
                user: data.user,
            };
            userContext.logIn(user);
        }else return

      }).catch((err) => {
        console.log(err);
        
      })
  }
  return (
    <div className="bg-slate-400 rounded p-8 flex flex-col items-center justify-center gap-4">
      <h2 className="text-slate-700 font-bold text-3xl tracking-widest">
        Register
      </h2>
      <form className="flex flex-col justify-center">
        <Input ref={inputRef} label="Username" type="text" />
        <Input ref={emailRef} label="Email" type="text" />
        <Input ref={pswRef} label="Password" type="password" />
        <Button onClick={handleLogin} type="submit" text="Register" />
      </form>
    </div>
  );
}
