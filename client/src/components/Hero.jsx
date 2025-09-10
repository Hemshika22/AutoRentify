import React, { useState } from 'react'
import { assets, cityList } from '../assets/assets'
import { useAppContext } from '../context/AppContext'
import { motion } from 'motion/react'

const Hero = () => {

    const[pickupLocation, setPickupLocation] = useState("")

    const {pickupDate, setPickupDate, returnDate, setReturnDate, navigate} = useAppContext();

    const handleSearch = (e) => {
        e.preventDefault()
        navigate('/cars?pickupLocation=' + pickupLocation + '&pickupDate=' + pickupDate + '&returnDate=' + returnDate)
    }
  return ( 
    <motion.div 
    initial={{ opacity: 0}}
    animate={{ opacity: 1}}
    transition={{duration: 0.8, delay: 0.2}}
    className='h-screen flex flex-col items-center justify-center bg-light text-center gap-14'>
      <motion.h1 
      initial={{y: 50, opacity: 0}}
      animate={{y: 0, opacity: 1}}
      transition={{duration: 0.8, delay: 0.2}}
      className='text-5xl font-bold'>Welcome to Our Car Rental Service</motion.h1>
      <motion.form
      initial={{scale: 0.95, opacity: 0, y: 50}}
      animate={{scale: 1, opacity: 1, y: 0}}
      transition={{duration: 0.8, delay: 0.2}}
       onSubmit={handleSearch} className='flex flex-col md:flex-row items-start md:items-center justify-between p-6 rounded-lg md:rounded-full w-full max-w-80 md:max-w-200 bg-white shadow-[0px_8px_20px_rgba(0,0,0,0.1)]'>
         <div className='flex flex-col md:flex-row items-start md:items-center gap-10 min-md:ml-8'>
            <div className='flex flex-col gap-2 items-start'>
                <select required value={pickupLocation} onChange={(e =>setPickupLocation(e.target.value))}>
                    <option value="">Pickup Location</option>
                    {cityList.map((city) => <option key={city} value={city}>{city}</option>)}
                </select>
                <p className='text-green-500 px-1 text-sm'>{pickupLocation ? pickupLocation : "Please select Location"}</p>
            </div>
            <div className='flex flex-col gap-2 items-start'>
                <label htmlFor='pickup-date'>Pick-up Date</label>
                <input value={pickupDate} onChange={(e) => setPickupDate(e.target.value)} type='date' min={new Date().toISOString().split("T")[0]} id='pickup-date' className='border border-gray-300 p-2 rounded-md text-sm text-gray-500' required/>
            </div>
            <div className='flex flex-col gap-2 items-start'>
                <label htmlFor='return-date'>Return Date</label>
                <input value={returnDate} onChange={(e) => setReturnDate(e.target.value)} type='date' id='return-date' className='border border-gray-300 p-2 rounded-md text-sm text-gray-500' required/>
            </div>
            
         </div>
         <motion.button
         whileHover={{scale: 1.1}}
         whileTap={{scale: 0.95}}
          className='flex items-center justify-center gap-1 px-9 py-3 max-sm:mt-4 bg-primary hover:bg-primary-dark text-white rounded-full cursor-pointer'>
            <img src={assets.search_icon} alt="Search" className='w-6 h-6 object-contain brightness-300' />Search</motion.button>
      </motion.form>
      <motion.img 
      initial={{y: 50, opacity: 0}}
      animate={{y: 0, opacity: 1}}
      transition={{duration: 0.8, delay: 0.2}}
      src={assets.main_car} alt="Car" className='max-h-74' />
    </motion.div>
  )
}

export default Hero
