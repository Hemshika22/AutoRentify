import React, { useState } from 'react'
import { assets, ownerMenuLinks } from '../../assets/assets'
import { NavLink, useLocation } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';

const Sidebar = () => {
  const {user, axios, fetchUser} = useAppContext();
  const location = useLocation();
  const [image, setImage] = useState('');

  const updateImage = async () => {
    try {
      const formData = new FormData();
      formData.append('image', image);

      const { data } = await axios.post('/api/owner/update-image', formData);
      
      if (data.success) {
        fetchUser();
        toast.success(data.message);
        setImage('');
      } else {
        toast.error(data.message);
      }
    }
    catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="relative min-h-screen md:flex flex-col items-center pt-8 max-w-60 w-full border-r border-borderColor text-sm bg-white shadow-sm">
      
      {/* Profile Section */}
      <div className="relative group">
        <label htmlFor="image" className="cursor-pointer">
          <img
            src={
              image
                ? URL.createObjectURL(image)
                : user?.image ||
                  'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=880&q=80'
            }
            alt="user"
            className="h-14 w-14 rounded-full mx-auto object-cover"
          />
          <input
            type="file"
            id="image"
            accept="image/*"
            hidden
            onChange={(e) => setImage(e.target.files[0])}
          />
          <div className="absolute inset-0 bg-black/30 rounded-full hidden group-hover:flex items-center justify-center">
            <img src={assets.edit_icon} alt="edit" className="w-5" />
          </div>
        </label>
      </div>

      {/* Save Button */}
      {image && (
        <button
          onClick={updateImage}
          className="mt-2 flex items-center gap-1 px-3 py-1 bg-primary/10 text-primary text-xs rounded cursor-pointer hover:bg-primary/20"
        >
          Save <img src={assets.check_icon} width={13} alt="check" />
        </button>
      )}

      {/* User Name */}
      <p className="mt-3 text-base font-medium text-gray-700 max-md:hidden">
        {user?.name}
      </p>

      {/* Navigation Links */}
      <div className="w-full mt-6">
        {ownerMenuLinks.map((link, index) => (
          <NavLink
            key={index}
            to={link.path}
            end
            className={({ isActive }) =>
              `flex items-center gap-3 w-full py-3 pl-6 transition-all ${
                isActive
                  ? 'bg-primary text-white border-l-4 border-primary'
                  : 'text-gray-600 hover:bg-gray-100'
              }`
            }
          >
            <img
              src={location.pathname === link.path ? link.coloredIcon : link.icon}
              alt="icon"
              className="w-5"
            />
            <span className="max-md:hidden">{link.name}</span>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
