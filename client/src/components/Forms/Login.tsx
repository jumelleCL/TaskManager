import { useState } from "react";
import Button from "../design/Button";
import Input from "../design/Input";
import useUserContext from "../../hooks/UseUserContext";
import { LoginSchema } from "../../../../schemas/userSchemas";
import axiosApi from "../../config/axiosApi";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

type LoginValues = {
  username: string;
  password: string;
};
export default function Login() {
  const { register, handleSubmit, formState, watch } = useForm<LoginValues>({
    mode: "onChange",
    resolver: zodResolver(LoginSchema),
  });

  const { errors, isValid } = formState;
  const [fetchError, setFetchError] = useState<string | null>(null);

  const userContext = useUserContext();
  function handleLogin() {
    const data = {
      username: watch("username"),
      password: watch("password"),
    };
    console.log(data);
    
    axiosApi
      .post("/api/users/login", data)
      .then((resp) => {
        if (resp.data && resp.data.user) {
          userContext.logIn(resp.data.user);
        } else return;
      })
      .catch((err) => {
        console.error(err.response.data.message);
        setFetchError(err.response.data.message);
      });
  }
  return (
    <div className="bg-slate-400 rounded p-8 flex flex-col items-center justify-center gap-4">
      <h2 className="text-slate-700 font-bold text-3xl tracking-widest">
        Login
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
          {...register("username")}
        />
        <Input
          validate
          error={errors.password}
          label="Password"
          type="password"
          {...register("password")}
        />
        <Button
          validate
          error={fetchError}
          disabled={!isValid}
          type="submit"
          className="disabled:opacity-50 disabled:cursor-not-allowed mt-3.5 text-slate-200"
          text="Log in"
        />
      </form>
    </div>
  );
}
