import React, { useEffect, useState } from 'react'
import Title from '../../components/owner/Title'
import { useAppContext } from '../../context/AppContext'
import toast from 'react-hot-toast'
import { motion, AnimatePresence } from 'motion/react'

const ManageBookings = () => {

  const {currency, axios} = useAppContext();

  const[bookings, setBookings] = useState([])

  const fetchOwnerBookings = async() => {
    try {
      const {data} = await axios.get('/api/bookings/owner')
      data.success ? setBookings(data.bookings) : toast.error(data.message)
    } catch (error) {
      toast.error(error.message)
    }
  }

  const changeBookingStatus = async(bookingId, status) => {
    try {
      const {data} = await axios.post('/api/bookings/change-status', {bookingId, status})
      if (data.success){
        toast.success(data.message)
        fetchOwnerBookings()
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(()=>{
    fetchOwnerBookings()
  },[])
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className='px-4 pt-10 md:px-10 w-full'>

    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}>
      <Title title="Manage Bookings" subtitle="Manage your car rental bookings" align="left" />
    </motion.div>
    
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className='max-w-3xl w-full rounded-md overflow-hidden border border-borderColor mt-6'>

      <table className='w-full border-collapse text-left text-sm text-gray-600'>
        <thead className='text-gray-500'>
          <tr>
            <th className='p-3 font-medium'>Car</th>
            <th className='p-3 font-medium max-md:hidden'>Date Range</th>
            <th className='p-3 font-medium'>Total</th>
            <th className='p-3 font-medium max-md:hidden'>Payments</th>
            <th className='p-3 font-medium'>Actions</th>
          </tr>
        </thead>
        <tbody>
          <AnimatePresence>
          {bookings.map((booking, index) => (
            <motion.tr 
              key={booking._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ backgroundColor: 'rgba(0,0,0,0.02)', transition: { duration: 0.2 } }}
              className='border-t border-borderColor text-gray-500'>
              
               <td className='p-3 flex items-center gap-3'>
                <motion.img 
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                  whileHover={{ scale: 1.1 }}
                  src={booking.car.image} alt='' className='w-12 h-12 aspect-square object-cover rounded-md' />
                <p className='font-medium max-md:hidden'>{booking.car.brand} {booking.car.model}</p>
               </td>
               <td className='p-3 max-md:hidden'>
                {booking.pickupDate.split('T')[0]} to {booking.returnDate.split('T')[0]}
               </td>

               <td className='p-3'>{currency}{booking.price}</td>
               <td className='p-3 max-md:hidden'>
                <motion.span 
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                  className='bg-gray-100 px-3 py-1 rounded-full text-xs'>Offline</motion.span>
               </td>
               <td className='p-3'>
                {booking.status === 'pending' ? (
                  <motion.select 
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: 0.8 + index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                    onChange={(e) => changeBookingStatus(booking._id, e.target.value)} 
                    value={booking.status} 
                    className='px-2 py-1.5 mt-1 text-gray-500 border border-borderColor rounded-md ooutline-none'>
                    <option value="pending">Pending</option>
                    <option value="cancelled">Cancelled</option>
                    <option value="confirmed">Confirmed</option>
                  </motion.select>
                ): (
                  <motion.span 
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: 0.8 + index * 0.1 }}
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${booking.status === 'confirmed' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>{booking.status}</motion.span>
                )}
               </td>
            </motion.tr>
          ))}
          </AnimatePresence>
        </tbody>

      </table>
    </motion.div>
      
    </motion.div>
  )
}

export default ManageBookings
