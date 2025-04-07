import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import useUser from '../Hooks/useUser';

const UserAccount = ({ data, isModal, onClose}) => {
  if (!isModal) return null;
  
  const [isEditing, setIsEditing] = useState(false);
  const user = useSelector((state)=>state.userdata.user_data)
  const [userData, setUserData] = useState({
    username: user?.username || '',
    email: user?.email || '',
    profileEmoji: '👤'
  });
  
  const {Update_UserAxios} = useUser() 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSave = () => {
    userData['id'] = user?.id
    Update_UserAxios(userData)
    setIsEditing(false);
  };
  
  const handleCancel = () => {
    setUserData({
      username:user?.username || '',
      email:user?.email || '',
      profileEmoji: '👤'
    });
    setIsEditing(false);
  };
  
  
  return (
    <div className="fixed inset-0 bg-white/10 backdrop-blur-sm bg-opacity-50  flex items-center justify-center p-4 z-50">
    <div className="bg-white rounded-lg shadow-md w-full max-w-md">
      
      {/* Modal Header */}
      <div className="flex bg-orange-400 py-4 px-4 rounded-t-lg justify-between items-center">
        <h2 className="text-xl font-bold text-white">{isEditing ? 'Edit Profile' : 'User Profile'}</h2>
        <button onClick={onClose} className="text-white cursor-pointer text-xl font-bold hover:text-gray-200">
          ✕
        </button>
      </div>
  
      {/* Modal Body with Padding */}
      <div className="p-6">
        <div className="flex flex-col items-center mb-6">
          <div className="text-6xl mb-4">{userData.profileEmoji}</div>
        </div>
  
        {/* Form Fields */}
        <div className="space-y-4">
          {/* Username Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
            {isEditing ? (
              <input
                type="text"
                name="username"
                value={userData.username}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded  focus:outline-gray-300"
              />
            ) : (
              <div className="p-2 bg-gray-50 rounded">{userData.username}</div>
            )}
          </div>
  
          {/* Email Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            {isEditing ? (
              <input
                type="email"
                name="email"
                value={userData.email}
                onChange={handleChange}
                className="w-full p-2 border  border-gray-300 rounded  focus:outline-gray-300"
              />
            ) : (
              <div className="p-2 bg-gray-50 rounded">{userData.email}</div>
            )}
          </div>
        </div>
  
        {/* Footer Buttons */}
        <div className="mt-6 flex justify-end gap-2">
          {isEditing ? (
            <>
              <button
                onClick={handleCancel}
                className="px-4 py-2 border cursor-pointer border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 cursor-pointer bg-orange-400 border border-transparent rounded-md text-sm font-medium text-white hover:bg-orange-500"
              >
                Save
              </button>
            </>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="px-4 py-2 cursor-pointer bg-orange-400 border border-transparent rounded-md text-sm font-medium text-white hover:bg-orange-500"
            >
              Edit Profile
            </button>
          )}
        </div>
      </div>
    </div>
  </div>
  
  );
};

export default UserAccount;