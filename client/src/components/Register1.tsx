
const Register1 = () => (
  <div className="flex flex-col items-center justify-center w-full h-screen bg-gray-100">
    <h2 className="text-3xl font-semibold mb-6">Sign up</h2>
    <div className="w-80">
      <div className="flex items-center bg-gray-200 p-4 rounded mb-4">
        <i className="fas fa-user text-gray-500 mr-2"></i>
        <input
          type="text"
          placeholder="Username"
          className="w-full bg-transparent outline-none text-gray-700"
        />
      </div>
      <div className="flex items-center bg-gray-200 p-4 rounded mb-4">
        <i className="fas fa-envelope text-gray-500 mr-2"></i>
        <input
          type="email"
          placeholder="Email"
          className="w-full bg-transparent outline-none text-gray-700"
        />
      </div>
      <div className="flex items-center bg-gray-200 p-4 rounded mb-6">
        <i className="fas fa-lock text-gray-500 mr-2"></i>
        <input
          type="password"
          placeholder="Password"
          className="w-full bg-transparent outline-none text-gray-700"
        />
      </div>
      <button className="w-full bg-blue-500 text-white py-2 rounded transition hover:bg-blue-600">
        Sign up
      </button>
    </div>
  </div>
);

export default Register1;
