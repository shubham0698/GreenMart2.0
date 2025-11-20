import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const cookie = Cookies.get("greenmart_user");

    if (!cookie) {
      navigate("/login");
      return;
    }

    try {
      const parsed = JSON.parse(decodeURIComponent(cookie).replace("j:", ""));
      setUser(parsed);
    } catch (error) {
      console.error("Error parsing cookie:", error);
      navigate("/login");
    }
  }, []);

  if (!user) {
    return <p className="text-center mt-10 text-gray-500">Loading...</p>;
  }

  return (
    <div className="w-full flex justify-center mt-12">
      <div className="bg-white shadow-lg rounded-lg p-6 w-96 border">
        <h2 className="text-2xl font-semibold mb-4 text-center">My Profile</h2>

        <div className="space-y-3">
          <p className="text-lg">
            <strong>Name:</strong> {user.username}
          </p>

          <p className="text-lg">
            <strong>Email:</strong> {user.email}
          </p>

          <p className="text-lg">
            <strong>User ID:</strong> {user.uid}
          </p>
        </div>

        <button
          onClick={() => navigate("/")}
          className="w-full mt-5 bg-green-500 hover:bg-green-600 text-white py-2 rounded-md"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default Profile;
