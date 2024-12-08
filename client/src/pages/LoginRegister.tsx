import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";

export default function LoginRegister() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState(location.pathname === "/register");

  useEffect(() => {
    setIsActive(location.pathname === "/register");
  }, [location.pathname]);

  const toggleActive = () => {
    const targetPath = isActive ? "/login" : "/register";
    navigate(targetPath); 
    
  };

  return (
    <Container className={`container ${isActive ? "active" : ""}`}>
      <div className="form-box login">
            <form action="">
                <h1>Login</h1> 
                <div className="input-box">
                    <input type="text" name="Username" id="username" placeholder="Username"/>
                    <i className="bx bxs-user"></i>
                </div>
                <div className="input-box">
                    <input type="password" name="Password" id="password" placeholder="Password"/>
                    <i className="bx bxs-lock-alt"></i>
                </div>
                <div className="forgot-link">
                    <a href="#">Forgot password?</a>
                </div>
                <button className="btn" type="submit">Login</button>
            </form>
        </div>

        <div className="form-box register">
            <form action="">
                <h1>Register</h1> 
                <div className="input-box">
                    <input type="text" name="Username" id="username" placeholder="Username"/>
                    <i className="bx bxs-user"></i>
                </div>
                <div className="input-box">
                    <input type="text" name="Email" id="email" placeholder="Email"/>
                    <i className="bx bxs-envelope"></i>
                </div>
                <div className="input-box">
                    <input type="password" name="Password" id="password" placeholder="Password"/>
                    <i className="bx bxs-lock-alt"></i>
                </div>
                <button className="btn" type="submit">Register</button>
            </form>
        </div>


        <div className="toggle-box">
            <div className="toggle-panel toggle-left">
                <p>Yo don't have an account with us?</p>
                <button className="btn register-btn" onClick={toggleActive}>Register</button>
            </div>
            <div className="toggle-panel toggle-right">
                <p>You already have an accout with us?</p>
                <button className="btn login-btn" onClick={toggleActive}>Login</button>
            </div>
        </div>
    </Container>
  );
}

const Container = styled.div`
  margin: 20px;
  position: relative;
  width: 850px;
  height: 550px;
  background: #fff;
  border-radius: 30px;
  box-shadow: 0 0 30px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  h1 {
    font-size: 36px;
    margin: -10px 0;
  }

  .form-box {
    position: absolute;
    right: 0;
    width: 50%;
    height: 100%;
    /* background: seagreen; */
    display: flex;
    align-items: center;
    color: #333;
    text-align: center;
    padding: 40px;
    z-index: 1;
    transition: 0.6s ease-in-out 0.6s, visibility 0s 0.3s;
    &.register {
      visibility: hidden;
    }
  }

  &.active .form-box.register {
    visibility: visible;
  }
  &.active .form-box.login {
    visibility: hidden;
  }
  &.active .form-box {
    right: 50%;
  }

  form {
    width: 100%;
  }

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
    background: #3260F4;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    border: none;
    cursor: pointer;
    font-size: 16px;
    color: #fff;
    font-weight: 600;
  }

  .toggle-box {
    position: absolute;
    width: 100%;
    height: 100%;
    &::before {
      content: "";
      position: absolute;
      left: -250%;
      width: 300%;
      height: 100%;
      background: #112051;
      z-index: 2;
      border-radius: 50px;
      transition: 0.6s ease-in-out;
    }
  }
  &.active .toggle-box::before {
    left: 50%;
  }
  &.active .toggle-panel.toggle-left {
    left: -50%;
    transition-delay: 0.6s;
  }
  &.active .toggle-panel.toggle-right {
    right: 0;
    transition-delay: 0.6s;
  }
  .toggle-panel {
    position: absolute;
    width: 50%;
    height: 100%;
    /* background: seagreen; */
    color: #fff;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    z-index: 2;
    transition: 0.6s ease-in-out;
    &.toggle-right {
      right: -50%;
    }
    &.toggle-left {
      left: 0;
    }
    p {
      font-size: 1.5rem;
      padding: 10%;
      padding-bottom: 2%;
    }
    .btn {
      width: 160px;
      height: 46px;
      background: transparent;
      border: 2px solid #fff;
      box-shadow: none;
    }
  }

  @media screen and (max-width: 650px) {
    & {
      height: calc(100vh - 20px);
    }
    .form-box {
      bottom: 0;
      width: 100%;
      height: 70%;
    }
    &.active .form-box {
      right: 0;
      bottom: 30%;
    }
    &.active .toggle-box::before {
      left: 0;
      top: 70%;
    }
    &.active .toggle-panel.toggle-left {
      left: 0;
      top: -30%;
    }
    &.active .toggle-panel.toggle-right {
      bottom: 0;
    }

    .toggle-box {
      &::before {
        left: 0;
        top: -270%;
        width: 100%;
        height: 300%;
        border-radius: 20vw;
      }
    }

    .toggle-panel {
      width: 100%;
      height: 30%;
      &.toggle-left {
        top: 0;
      }
      &.toggle-right {
        right: 0;
        bottom: -30%;
      }
    }
  }
`;
