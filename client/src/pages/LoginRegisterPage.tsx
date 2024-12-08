import { useState } from 'react';
import Login1 from '../components/Login1';
import Register1 from '../components/Register1';

const LoginRegisterPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="relative">
      {isLogin ? <Login1 /> : <Register1 />}
      <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2">
        <button
          onClick={() => setIsLogin(!isLogin)}
          className="text-blue-500 underline"
        >
          {isLogin ? 'Go to Sign up' : 'Go to Sign in'}
        </button>
      </div>
    </div>
  );
};

export default LoginRegisterPage;
