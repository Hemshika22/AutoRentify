import React from 'react'
import { assets} from '../../assets/assets'
import { Link } from 'react-router-dom'
import { useAppContext } from '../../context/AppContext'
import { motion } from 'motion/react'

const NavbarOwner = () => {

    const { user } = useAppContext();

  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className='flex items-center justify-between px-4 md:px-6 lg:px-10 py-3 md:py-4 bg-white border-b border-borderColor shadow-sm sticky top-0 z-50'>
      <Link to='/' className='flex items-center'>
        <motion.img 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          src={assets.navLogo} 
          alt="Logo" 
          className='w-20 md:w-24 lg:w-28 h-auto'/>
      </Link>
      
      <div className='flex items-center gap-3'>
        <div className='hidden md:flex items-center gap-2'>
          <div className='w-10 h-10 rounded-full overflow-hidden border-2 border-gray-200'>
            <img 
              src={
                user?.image ||
                'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=880&q=80'
              }
              alt="Profile" 
              className='w-full h-full object-cover'/>
          </div>
          <div className='text-right'>
            <p className='text-sm font-medium text-gray-700'>Welcome, {user?.name || "Owner"}</p>
            <p className="text-xs text-gray-400">Car Owner</p>
          </div>
        </div>
        
        {/* Mobile view */}
        <div className='md:hidden flex items-center gap-2'>
          <div className='w-8 h-8 rounded-full overflow-hidden border-2 border-gray-200'>
            <img 
              src={
                user?.image ||
                'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=880&q=80'
              }
              alt="Profile" 
              className='w-full h-full object-cover'/>
          </div>
          <span className='text-sm font-medium text-gray-700'>{user?.name || "Owner"}</span>
        </div>
      </div>
    </motion.div>
  )
}

export default NavbarOwner;
