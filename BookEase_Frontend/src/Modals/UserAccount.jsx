import React, { useState } from 'react';
import { useSelector } from 'react-redux';

const UserAccount = ({ data, isModal, onClose}) => {
  if (!isModal) return null;
  
  const [isEditing, setIsEditing] = useState(false);
  const user = useSelector((state)=>state.userdata.user_data)
  const [userData, setUserData] = useState({
    username: user?.username || '',
    email: user?.email || '',
    profileEmoji: user?.profileEmoji || '👤'
  });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSave = () => {
    onSave(userData);
    setIsEditing(false);
  };
  
  const handleCancel = () => {
    setUserData({
      username:user?.username || '',
      email:user?.email || '',
      profileEmoji:user?.profileEmoji || '👤'
    });
    setIsEditing(false);
  };
  
  const emojis = ['👤', '😀', '😎', '🤓', '🥸', '🤠', '👩‍💻', '👨‍💻', '🧑‍💼', '👨‍🚀'];
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">User Profile</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            ✕
          </button>
        </div>
        
        <div className="flex flex-col items-center mb-6">
          {isEditing ? (
            <div className="mb-4">
              <div className="text-center mb-2">Select Profile Emoji</div>
              <div className="flex flex-wrap justify-center gap-2">
                {emojis.map((emoji, index) => (
                  <button
                    key={index}
                    className={`text-2xl p-2 rounded-full ${emoji === userData.profileEmoji ? 'bg-blue-100' : 'hover:bg-gray-100'}`}
                    onClick={() => setUserData(prev => ({ ...prev, profileEmoji: emoji }))}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-6xl mb-4">{userData.profileEmoji}</div>
          )}
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
            {isEditing ? (
              <input
                type="text"
                name="username"
                value={userData.username}
                onChange={handleChange}
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            ) : (
              <div className="p-2 bg-gray-50 rounded">{userData.username}</div>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            {isEditing ? (
              <input
                type="email"
                name="email"
                value={userData.email}
                onChange={handleChange}
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            ) : (
              <div className="p-2 bg-gray-50 rounded">{userData.email}</div>
            )}
          </div>
        </div>
        
        <div className="mt-6 flex justify-end gap-2">
          {isEditing ? (
            <>
              <button
                onClick={handleCancel}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-blue-600 border border-transparent rounded-md text-sm font-medium text-white hover:bg-blue-700"
              >
                Save
              </button>
            </>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="px-4 py-2 bg-blue-600 border border-transparent rounded-md text-sm font-medium text-white hover:bg-blue-700"
            >
              Edit Profile
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserAccount;