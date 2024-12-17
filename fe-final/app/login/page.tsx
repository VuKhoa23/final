"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
import axiosInstance from "@/lib/axios";
import { useDispatch } from "react-redux";
import { setUserInfo } from "@/store/userInfoSlice";


type LoginFormInputs = {
  username: string;
  password: string;
};

export default function LoginPage() {
  const router = useRouter();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();

  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    try {
      const response = await axiosInstance.post("/users/login", data);
      const userInfo = { username: data.username, userId: response.data.data.userId };
      dispatch(setUserInfo(userInfo)); // Store user info in Redux
      router.push("/whoami");
    } catch (error) {
      console.error("Login failed:", error);
      alert("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen w-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-center text-gray-800">Login</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Username</label>
            <input
              {...register("username", { required: "Username is required" })}
              className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors.username && <p className="text-sm text-red-500">{errors.username.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              {...register("password", { required: "Password is required" })}
              className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
          </div>

          <button
          type="button"
          onClick={() => router.push("/register")}
          className="w-full py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 mt-4"
          >
          Don’t have an account? Register here
          </button>
          <button
            type="submit"
            className="w-full py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
