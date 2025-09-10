import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { motion } from 'motion/react'

const CarCard = ({ car }) => {

    const currency = import.meta.env.VITE_CURRENCY
    const navigate = useNavigate()

  return (
    <motion.div 
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
      whileTap={{ scale: 0.98 }}
      onClick={() => {navigate(`/car-details/${car._id}`); scrollTo(0,0)}} 
      className='group rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500 cursor-pointer bg-white'>

      <div className='relative h-48 overflow-hidden'>
        <img 
          src={car.image} 
          alt={`${car.brand} ${car.model}`} 
          className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-500'/>
        
        {car.isAvailable && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className='absolute top-4 left-4 bg-green-500 text-white text-xs px-3 py-1 rounded-full font-medium'>
            Available Now
          </motion.div>
        )}
        
        <div className='absolute bottom-4 right-4 bg-black/80 backdrop-blur-sm text-white px-3 py-2 rounded-lg'>
            <span className='font-semibold text-lg'>{currency}{car.pricePerDay}</span>
            <span className='text-sm text-white/80'> / day</span>
        </div>
      </div>
      
      <div className='p-4 sm:p-5'>
        <div className='flex justify-between items-start mb-3'>
            <div>
                <h3 className='text-lg font-semibold text-gray-900 mb-1'>{car.brand} {car.model}</h3>
                <p className='text-sm text-gray-500'>{car.category} • {car.year}</p>
            </div>
        </div>
        
        <div className='grid grid-cols-2 gap-3 text-gray-600'>
            <div className='flex items-center text-sm'>
                <img src={assets.users_icon} alt="Users Icon" className='h-4 w-4 mr-2 text-gray-400'/>
                <span className='text-gray-600'>{car.seating_capacity} Seats</span>
            </div> 
            
            <div className='flex items-center text-sm'>
                <img src={assets.fuel_icon} alt="Fuel Icon" className='h-4 w-4 mr-2 text-gray-400'/>
                <span className='text-gray-600'>{car.fuel_type}</span>
            </div> 
            
            <div className='flex items-center text-sm'>
                <img src={assets.car_icon} alt="Transmission Icon" className='h-4 w-4 mr-2 text-gray-400'/>
                <span className='text-gray-600'>{car.transmission}</span>
            </div> 
            
            <div className='flex items-center text-sm'>
                <img src={assets.location_icon} alt="Location Icon" className='h-4 w-4 mr-2 text-gray-400'/>
                <span className='text-gray-600'>{car.location}</span>
            </div> 
        </div>
      </div>
    </motion.div>
  )
}

export default CarCard

