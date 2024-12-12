import { useState } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import useUserContext from "../../hooks/UseUserContext";
import { LoginSchema } from "../../../../schemas/userSchemas";
import axiosApi from "../../config/axiosApi";
import { FaEye, FaEyeSlash } from "react-icons/fa";

type LoginValues = {
  username: string;
  password: string;
};

export default function FormLogin() {
  const { register, handleSubmit, formState, watch } = useForm<LoginValues>({
    mode: "onChange",
    resolver: zodResolver(LoginSchema),
  });

  const { errors, isValid } = formState;
  const [fetchError, setFetchError] = useState<string | null>(null);

  const userContext = useUserContext();
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPSW = () => {
    setShowPassword(!showPassword); 
  };

  const handleLogin = () => {
    const data = {
      username: watch("username"),
      password: watch("password"),
    };

    axiosApi
      .post("/api/users/login", data)
      .then((resp) => {
        if (resp.data && resp.data.user) {
          userContext.logIn(resp.data.user);
        }
      })
      .catch((err) => {
        setFetchError(err.response?.data?.message);
      });
  };

  return (
    <Form onSubmit={handleSubmit(handleLogin)}>
      <h1>Login</h1>
      <div className="input-box">
        <input
          type="text"
          placeholder="Username"
          {...register("username")}
        />
        {errors.username && <span className="error">{errors.username.message}</span>}
      </div>
      <div className="input-box">
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          {...register("password")}
        />
        <i onClick={handleShowPSW} className="cursor-pointer">{showPassword ? <FaEyeSlash /> : <FaEye />}</i>
        {errors.password && <span className="error">{errors.password.message}</span>}
      </div>
      <div className="forgot-link">
        <a href="#">Forgot password?</a>
      </div>
      <button className="btn" type="submit" disabled={!isValid}>
        Login
      </button>
      {fetchError && <p className="error">{fetchError}</p>}
    </Form>
  );
}

const Form = styled.form`
  width: 100%;
  .input-box {
    position: relative;
    margin: 30px 0;
    input {
      width: 100%;
      padding: 13px 50px 13px 20px;
      background: #eee;
      border-radius: 8px;
      border: none;
      outline: none;
      font-size: 16px;
      color: #333;
      font-weight: 500;
    }
    input::placeholder {
      color: #888;
      font-weight: 400;
    }
    i {
      position: absolute;
      right: 20px;
      top: 50%;
      transform: translateY(-50%);
      font-size: 20px;
      color: #888;
    }
    .error {
      position: absolute;
      bottom: -20px;
      left: 0;
      color: red;
      font-size: 12px;
    }
  }
  .forgot-link {
    margin: -15px 0 15px;
    a {
      font-size: 14.5px;
      color: #333;
      text-decoration: none;
    }
  }
  .btn {
    width: 100%;
    height: 48px;
    background: #3260f4;
    border-radius: 8px;
    color: #fff;
    font-weight: 600;
    cursor: pointer;
    transition: 0.3s;
    &:disabled {
      background: #888;
      cursor: not-allowed;
    }
  }
  .error {
    color: red;
    font-size: 14px;
    text-align: center;
    margin-top: 10px;
  }
`;
