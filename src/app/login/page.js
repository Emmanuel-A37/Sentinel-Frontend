'use client';
import { BsShield } from "react-icons/bs";
import Link from "next/link";
import { useState, useEffect } from "react";
import api from '@/api/axiosconfig.js';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useRouter } from "next/navigation";

const Login = () => {
  const [formData, setFormData] = useState({email : "", password : ""});
  const [isLoading, setIsLoading] = useState(false);
  const [view, setView] = useState(false);
  const [notification, setNotification] = useState(null);
  const router = useRouter();

  const clearNotification = () => {
    setNotification(null);
};

  useEffect(() => {
      if (notification) {
          const timer = setTimeout(() => {
              clearNotification();
          }, 5000);
          return () => clearTimeout(timer);
      }
  }, [notification]);

  const handleInputChange = (e) => {
      const {name, value} = e.target;
      setFormData({...formData, [name] : value});
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!formData.email || !formData.password){
        setNotification({type : "error", message : "Complete the form"});
        return;
    }
    try {
        setIsLoading(true);
        const { data } = await api.post('auth/login', formData);
        if(data){
            setNotification({type : "success", message : data.message || "Successfully logged in"});
            router.push('/dashboard');
        }   
              
    } catch (error) {
        const message = error?.response?.data?.message || "Error logging in";
        setNotification({ type: "error", message });
    }
    finally{
      setIsLoading(false);
    }

    }
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-white flex items-center justify-center px-6">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl p-10">

        <div className="flex items-center justify-center gap-3 mb-8">
          <BsShield className="text-blue-700" size={40} />
          <h1 className="text-4xl font-extrabold text-gray-900">Sentinel</h1>
        </div>


        <div className="text-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-1">Welcome Back</h2>
          <p className="text-gray-600">Sign in to your account</p>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="block text-gray-700 text-sm mb-1">Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              value={formData.email}
              name = "email"
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

             <div>
              <label className="block text-gray-700 text-sm mb-1">Password</label>
              <div className="flex items-center w-full px-4 py-3 border border-gray-300 rounded-md focus-within:ring-2 focus-within:ring-blue-500">
                <input
                  type={view ? "text" : "password"}
                  placeholder="••••••••"
                  value={formData.password}
                  name="password"
                  minLength={7}
                  onChange={handleInputChange}
                  className="w-full h-full border-0 outline-none"
                />
                <button
                  type="button"
                  onClick={() => setView(!view)}
                  className="text-gray-600 ml-2 focus:outline-none cursor-pointer"
                >
                  {view ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                </button>
              </div>
            </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full bg-blue-600 cursor-pointer hover:bg-blue-700 text-white font-medium py-3 rounded-md transition ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            {isLoading ? "Logging In..." : "Login"}
          </button>
        </form>


        <p className="text-center text-gray-600 text-sm mt-6">
          Don't have an account?{" "}
          <Link href="/signup" className="text-blue-600 hover:underline">
            Sign up
          </Link>
        </p>

        <div className="mt-10 bg-blue-50 p-4 rounded-lg text-center text-blue-700 text-sm font-medium">
         Start monitoring your APIs in minute.
        </div>
      </div>
      {notification && (
            <div
                className={`fixed top-5 right-5 p-4 rounded-lg shadow-lg max-w-sm z-50 ${notification.type === "success"
                    ? "bg-green-100 border border-green-400 text-green-800"
                    : "bg-red-100 border border-red-400 text-red-800"
                    }`}
                role={notification.type === "error" ? "alert" : "status"}
            >
                <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">{notification.message}</p>
                    <button
                        onClick={clearNotification}
                        className={`ml-4 text-xl font-semibold leading-none ${notification.type === "success"
                            ? "text-green-800 hover:text-green-900"
                            : "text-red-800 hover:text-red-900"
                            } focus:outline-none`}
                        aria-label="Close notification"
                    >
                        &times;
                    </button>
                </div>
            </div>
        )}
    </div>
  );
};

export default Login;
