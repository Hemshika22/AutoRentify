import React, { useEffect, useState } from 'react'
import { dummyMyBookingsData } from '../assets/assets';
import Title from '../components/Title';
import { useAppContext } from '../context/AppContext';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'motion/react';

const MyBookings = () => {

  const {axios, user, currency} = useAppContext()

  const [bookings, setBookings] = useState([]);

  const fetchMyBookings = async() => {
    try {
      const {data} = await axios.get('/api/bookings/user')
      if (data.success) {
        setBookings(data.bookings)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
    }
  

  useEffect(() => {
    user && fetchMyBookings()
  }, [user])
  const getStatusColor = (status) => {
    switch(status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toISOString().split('T')[0];
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className='flex flex-col min-h-screen'>
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className='flex-grow px-6 md:px-16 lg:px-24 xl:px-32 2xl:px-48 mt-16 text-sm max-w-7xl'>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}>
          <Title title="My Bookings" subtitle="View and manage your all car bookings" align="left"/>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className='mt-12 space-y-6'>
          <AnimatePresence>
          {bookings.map((booking, index) => (
            <motion.div 
              key={booking.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5, transition: { duration: 0.3 } }}
              className='bg-gray-50 rounded-lg p-6 border border-gray-200'>
              <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
                
                {/* Left Side - Car Image and Info */}
                <motion.div 
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                  className='flex flex-col'>
                  <motion.img 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                    src={booking.car.image} 
                    alt={`${booking.car.brand} ${booking.car.model}`}
                    className='w-full h-32 object-cover rounded-lg mb-3'
                  />
                  <h3 className='font-semibold text-lg text-gray-900'>
                    {booking.car.brand} {booking.car.model}
                  </h3>
                  <p className='text-gray-500 text-sm'>
                    {booking.car.year} • {booking.car.category} • {booking.car.location}
                  </p>
                </motion.div>

                {/* Middle Section - Booking Details */}
                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                  className='flex flex-col gap-4'>
                  <div className='flex gap-2'>
                    <motion.span 
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4, delay: 1 + index * 0.1 }}
                      className='px-3 py-1 bg-gray-200 text-gray-700 rounded-full text-xs font-medium'>
                      Booking #{index + 1}
                    </motion.span>
                    <motion.span 
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4, delay: 1.1 + index * 0.1 }}
                      className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                      {booking.status}
                    </motion.span>
                  </div>
                  
                  <div className='flex items-center gap-2 text-gray-600'>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span className='text-sm'>Rental Period</span>
                  </div>
                  <p className='text-gray-900 font-medium'>
                    {formatDate(booking.pickupDate)} To {formatDate(booking.returnDate)}
                  </p>
                  
                  <div className='flex items-center gap-2 text-gray-600'>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span className='text-sm'>Pick-up Location</span>
                  </div>
                  <p className='text-gray-900 font-medium'>{booking.car.location}</p>
                </motion.div>

                {/* Right Side - Price and Booking Date */}
                <motion.div 
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 1 + index * 0.1 }}
                  className='flex flex-col justify-between items-end'>
                  <div className='text-right'>
                    <p className='text-gray-500 text-sm'>Total Price</p>
                    <motion.h2 
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.6, delay: 1.2 + index * 0.1 }}
                      className='text-3xl font-semibold text-blue-600'>{currency}{booking.price}</motion.h2>
                    <p className='text-gray-500 text-sm'>Booked on {formatDate(booking.createdAt)}</p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ))}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

export default MyBookings;
