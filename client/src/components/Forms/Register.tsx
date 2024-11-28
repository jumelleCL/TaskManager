import Button from "../design/Button";
import Input from "../design/Input";
import { User } from "../../context/UserProvider";
import useUserContext from "../../hooks/UseUserContext";
import axiosApi from "../../config/axiosApi";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {AddUserSchema} from '../../../../schemas/userSchemas'
import { useState } from "react";


type RegisterValues = {
  username: string;
  email: string;
  password: string;
};

export default function Register() {
  const { register, handleSubmit, formState, watch } = useForm<RegisterValues>({
    mode: "onChange",
    resolver: zodResolver(AddUserSchema),
  });

  const { errors, isValid } = formState;
  const [fetchError, setFetchError] = useState<string | null>(null);

  const userContext = useUserContext();
  function handleLogin() {
    const data = {
      username: watch('username'),
      password: watch('password'),
      email: watch('email'),
    };
    console.log(isValid);
        
    axiosApi
      .post(`/api/users/register`, data)
      .then((resp) => {
        if (resp.data && data.username) {
          const user: User = {
            user: data.username,
          };
          userContext.logIn(user);
        } else return;
      })
      .catch((err) => {
        setFetchError(err.response.data.message)
      });
  }
  return (
    <div className="bg-slate-400 rounded p-8 flex flex-col items-center justify-center gap-4">
      <h2 className="text-slate-700 font-bold text-3xl tracking-widest">
        Register
      </h2>
      <form
        className="flex flex-col justify-center"
        onSubmit={handleSubmit(handleLogin)}
      >
        <Input
          validate
          error={errors.username}
          label="Username"
          type="text"
          {...register('username')}
          />
        <Input
          validate
          error={errors.email}
          label="Email"
          type="text"
          {...register('email')}
          />
        <Input
          validate
          error={errors.password}
          label="Password"
          type="password"
          {...register('password')}
        />
        <Button
        validate
        error={fetchError}
          disabled={!isValid}
          type="submit"
          className="disabled:opacity-50 disabled:cursor-not-allowed mt-3.5 text-slate-200"
          text="Register"
        />
      </form>
    </div>
  );
}
