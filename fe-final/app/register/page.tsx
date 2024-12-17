"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
import axiosInstance from "@/lib/axios";

type RegisterFormInputs = {
  username: string;
  password: string;
};

export default function RegisterPage() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormInputs>();

  const onSubmit: SubmitHandler<RegisterFormInputs> = async (data) => {
    try {
      await axiosInstance.post("/users/register", data);
      alert("Registration successful. Please login.");
      router.push("/login");
    } catch (error) {
      console.error("Registration failed:", error);
      alert("Registration failed. Please try again.");
    }
  };

  return (
    <div className="flex min-h-screen items-center w-screen justify-center bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center text-gray-800">Register</h1>
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
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters long",
                },
              })}
              className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
          </div>

          <button
            type="button"
            onClick={() => router.push("/login")}
            className="w-full py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 mt-4"
          >
            Already have an account? Login here
          </button>
          <button
            type="submit"
            className="w-full py-2 text-white bg-green-600 rounded-md hover:bg-green-700"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}
