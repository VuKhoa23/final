"use client";

import { useEffect, useState } from "react";
import axios from "axios";

interface UserData {
  userId: string;
}

const WhoAmIPage: React.FC = () => {
  const [userId, setUserId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const response = await axios.get<UserData>("http://localhost:3001/api/v1/users/whoami",         
          { withCredentials: true }
        );
        setUserId(response.data.userId);
      } catch (err: any) {
        console.error("Error fetching userId:", err.response?.data || err.message);
        setError(err.response?.data?.message || "Failed to fetch user data.");
      }
    };

    fetchUserId();
  }, []);

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <h1 className="text-2xl font-semibold mb-4">Who Am I</h1>
        {error ? (
          <p className="text-red-500">{error}</p>
        ) : userId ? (
          <p className="text-lg">Your User ID: <strong>{userId}</strong></p>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default WhoAmIPage;
