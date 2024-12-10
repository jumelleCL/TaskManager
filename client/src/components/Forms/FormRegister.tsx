import { useState } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import useUserContext from "../../hooks/UseUserContext";
import { AddUserSchema } from "../../../../schemas/userSchemas";
import axiosApi from "../../config/axiosApi";
import { FaEye, FaEyeSlash } from "react-icons/fa";

type RegisterValues = {
  username: string;
  email: string;
  password: string;
};

export default function FormRegister() {
  const { register, handleSubmit, formState, watch } = useForm<RegisterValues>({
    mode: "onChange",
    resolver: zodResolver(AddUserSchema),
  });

  const { errors, isValid } = formState;
  const [fetchError, setFetchError] = useState<string | null>(null);

  const userContext = useUserContext();  
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPSW = () => {
    setShowPassword(!showPassword); 
  };

  const handleRegister = () => {
    const data = {
      username: watch("username"),
      email: watch("email"),
      password: watch("password"),
    };

    axiosApi
      .post("/api/users/register", data)
      .then((resp) => {
        if (resp.data && resp.data.name) {
          userContext.logIn(resp.data.name);
        }
      })
      .catch((err) => {
        console.error(err.response?.data?.message || "Registration error");
        setFetchError(err.response?.data?.message || "Registration error");
      });
  };

  return (
    <Form onSubmit={handleSubmit(handleRegister)}>
      <h1>Register</h1>
      <div className="input-box">
        <input
          type="text"
          placeholder="Username"
          {...register("username")}
        />
        <i className="bx bxs-user"></i>
        {errors.username && <span className="error">{errors.username.message}</span>}
      </div>
      <div className="input-box">
        <input
          type="text"
          placeholder="Email"
          {...register("email")}
        />
        <i className="bx bxs-envelope"></i>
        {errors.email && <span className="error">{errors.email.message}</span>}
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
      <button className="btn" type="submit" disabled={!isValid}>
        Register
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
