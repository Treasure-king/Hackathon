import { useState, useEffect } from "react";
import axios from "axios";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    bio: "",
    profilePic: "",
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get("/api/user/profile");
        setUser(response.data);
        setFormData(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      const response = await axios.put("/api/user/profile", formData);
      setUser(response.data);
      setEditMode(false);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  if (loading) return <p className="text-center text-lg mt-6">Loading profile...</p>;
  if (!user) return <p className="text-center text-error text-lg mt-6">Failed to load profile.</p>;

  return (
    <div className="container mx-auto py-12 px-6">
      <div className="max-w-lg mx-auto bg-base-100 shadow-xl rounded-lg p-6 flex flex-col items-center">
        <div className="avatar">
          <div className="w-32 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
            <img src={user.profilePic} alt="Profile" />
          </div>
        </div>

        <h1 className="text-3xl font-bold text-center text-primary mt-4">{user.fullName}</h1>
        <p className="text-lg text-gray-500">{user.email}</p>

        <div className="bg-gray-100 p-4 mt-4 rounded-lg w-full text-center">
          <p className="text-gray-700">{user.bio || "No bio available"}</p>
        </div>

        <button className="btn btn-primary w-full mt-4" onClick={() => setEditMode(true)}>Edit Profile</button>
      </div>

      {editMode && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Edit Profile</h2>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="input input-bordered w-full mb-2"
              placeholder="Full Name"
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="input input-bordered w-full mb-2"
              placeholder="Email"
            />
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              className="textarea textarea-bordered w-full mb-2"
              placeholder="Bio"
            />
            <input
              type="text"
              name="profilePic"
              value={formData.profilePic}
              onChange={handleChange}
              className="input input-bordered w-full mb-2"
              placeholder="Profile Picture URL"
            />
            <div className="flex justify-between">
              <button className="btn btn-primary" onClick={handleSave}>Save</button>
              <button className="btn btn-error" onClick={() => setEditMode(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
