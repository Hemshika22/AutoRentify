import React, { useState } from 'react'
import { assets, menuLinks } from '../assets/assets'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'
import toast from 'react-hot-toast'
import { motion } from 'motion/react'


const Navbar = () => {

  const {setShowLogin, user, logout, isOwner, axios, setIsOwner} = useAppContext();

    const location = useLocation();
    const [open, setOpen] = useState(false)
    const navigate = useNavigate();

    const  changeRole = async () => {
      try {
        const { data } = await axios.post('/api/owner/change-role')
        if (data.success) {
          setIsOwner(true);
          toast.success(data.message);
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        toast.error(error.message);
      }
    }

  return (
    <motion.div 
    initial={{y: -100, opacity: 0}}
    animate={{y: 0, opacity: 1}}
    transition={{duration: 0.5}}
    className={`flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 text-white
    border-b border-gray-700  transition-all duration-300 bg-gray-900 sticky top-0 z-50
    ${location.pathname === '/' && "bg-gray-900"}`}>
      <motion.Link
      whileHover={{scale: 1.05}}
       to="/" className='flex items-center'>
        <img
         src={assets.logo} alt="Logo" className='h-10 w-13 md:h-10 lg:h-12 object-contain' />
        <span className='text-xl md:text-2xl lg:text-3xl font-bold text-white'>AutoRentify</span>
      </motion.Link>

      <div className={`max-sm:fixed max-sm:h-screen max-sm:w-full max-sm:top-16 max-sm:border-t border-gray-700 right-0 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-8 max-sm:p-4
      transition-all duration-300 z-50 bg-gray-900 sm:bg-transparent
      ${open ? "max-sm:translate-x-0": "max-sm:translate-x-full"} sm:translate-x-0`}>
        {menuLinks.map((link, index)=> (
            <Link key={index} to={link.path} className='hover:text-blue-400 transition-colors duration-200 font-medium'>
                {link.name}
            </Link>
        ))}

        <div className='hidden lg:flex items-center text-sm gap-2 border
        border-gray-600 px-3 rounded-full max-w-56 bg-gray-800'>
          <input type="text" placeholder='Search cars...' className='py-1.5 w-full bg-transparent focus:outline-none placeholder-gray-400 text-white'/>
          <img src={assets.search_icon} alt="Search" className='w-4 h-4'/>
        </div>

        <div className='flex max-sm:flex-col items-start sm:items-center gap-6'>
          <button onClick={() => isOwner ? navigate("/owner") : changeRole()} className='cursor-pointer hover:text-blue-400 transition-colors duration-200 font-medium'>{isOwner ? 'Dashboard' : 'List Cars'}</button>
          <button onClick={() => {user ? logout() : setShowLogin(true)}} className='cursor-pointer px-8 py-2 bg-blue-600 hover:bg-blue-700 transition-all text-white rounded-lg font-medium'>{user ?'Logout' : 'Login'}</button>
        </div>
      </div>

      <button className='sm:hidden cursor-pointer' aria-label="Menu" onClick={() => setOpen(!open)}>
        <img src={open ? assets.close_icon : assets.menu_icon} alt="menu" className='w-6 h-6' />
      </button>
    </motion.div>
  )
}

export default Navbar
