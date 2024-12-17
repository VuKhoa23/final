"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axiosInstance from "@/lib/axios";
import { useDispatch } from "react-redux";
import { clearUserInfo } from "@/store/userInfoSlice";

type WhoAmIResponse = {
  success: boolean;
  data: { userId: number };
  errors: null | string;
};

export default function WhoAmIPage() {
  const [userId, setUserId] = useState<number | null>(null);
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchWhoAmI = async () => {
      try {
        const response = await axiosInstance.get<WhoAmIResponse>("/users/whoami");

        if (response.data.success) {
          setUserId(response.data.data.userId);
        }
      } catch (error: any) {
        if (error.response?.status === 401) {
          dispatch(clearUserInfo()); // Clear user info on 401 error
          router.push("/login");
        }
      }
    };

    fetchWhoAmI();
  }, [router, dispatch]);

  return (
    <div className="flex items-center justify-center w-screen h-screen bg-gray-100">
      <div className="p-8 bg-white rounded-lg shadow-lg text-center">
        <h1 className="text-3xl font-bold text-gray-800">Who Am I</h1>
        {userId ? (
          <p className="mt-4 text-lg text-gray-700">
            Your User ID: <span className="font-bold">{userId}</span>
          </p>
        ) : (
          <p className="mt-4 text-lg text-gray-500">Loading...</p>
        )}
      </div>
    </div>
  );
}
