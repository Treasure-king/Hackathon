import { useState } from "react";

const Profile = () => {
  const [user, setUser] = useState({
    name: "John Doe",
    email: "john@example.com",
    bio: "Software Developer and AI Enthusiast.",
  });

  return (
    <div className="container mx-auto py-12 px-6">
      <h1 className="text-4xl font-bold text-center text-primary mb-6">My Profile</h1>
      <div className="max-w-lg mx-auto bg-base-100 shadow-lg p-6 rounded-lg">
        <p className="text-lg font-semibold">Name: <span className="text-gray-700">{user.name}</span></p>
        <p className="text-lg font-semibold">Email: <span className="text-gray-700">{user.email}</span></p>
        <p className="text-lg font-semibold">Bio:</p>
        <p className="text-gray-700">{user.bio}</p>
        <button className="btn btn-primary mt-4">Edit Profile</button>
      </div>
    </div>
  );
};

export default Profile;
