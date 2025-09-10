import React, { useEffect, useState } from 'react'
import { assets, dummyCarData } from '../../assets/assets'
import Title from '../../components/owner/Title'
import { useAppContext } from '../../context/AppContext'
import toast from 'react-hot-toast'
import { motion, AnimatePresence } from 'motion/react'

const ManageCars = () => {

  const {isOwner, axios, currency} = useAppContext();


  const [cars, setCars] = useState([])

  const fetchOwnerCars = async() => {
      try {
        const {data} = await axios.get('/api/owner/cars')
        if(data.success){
          setCars(data.cars)
        } else {
          toast.error(data.message)
        }
      } catch (error){
        toast.error(error.message)
      }
    }

    const toggleAvailability = async(carId) => {
      try {
        const {data} = await axios.post('/api/owner/toggle-car',{carId})
        if(data.success){
          toast.success(data.message)
          fetchOwnerCars()
        } else {
          toast.error(data.message)
        }
      } catch (error){
        toast.error(error.message)
      }
    }

    const deleteCar = async(carId) => {
      try {

        const confirm = window.confirm("Are you sure you want to delete this car?");
        if (!confirm) return null

        const {data} = await axios.post('/api/owner/delete-car',{carId})
        if(data.success){
          toast.success(data.message)
          fetchOwnerCars()
        } else {
          toast.error(data.message)
        }
      } catch (error){
        toast.error(error.message)
      }
    }
  
    useEffect(() => {
    isOwner &&  fetchOwnerCars()
    },[isOwner])

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
      <Title title="Manage Cars" subtitle="Manage your cars" align="left" />
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
            <th className='p-3 font-medium max-md:hidden'>Category</th>
            <th className='p-3 font-medium'>Price</th>
            <th className='p-3 font-medium max-md:hidden'>Status</th>
            <th className='p-3 font-medium'>Actions</th>
          </tr>
        </thead>
        <tbody>
          <AnimatePresence>
          {cars.map((car, index) => (
            <motion.tr 
              key={car._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ backgroundColor: 'rgba(0,0,0,0.02)', transition: { duration: 0.2 } }}
              className='border-t border-borderColor'>
              <td className='p-3 flex items-center gap-3'>
              <motion.img 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                whileHover={{ scale: 1.1 }}
                src={car.image} alt="" className='h-12 w-12 aspect-square rounded-md object-cover'/>
              <div className='max-md:hidden'>
                <p className='font-medium'>{car.brand}</p>
                <p className='text-xs text-gray-500'>{car.seating_capacity} . {car.transmission}</p>
              </div>

              </td>
              <td className='p-3 max-md:hidden'>
                {car.category}
              </td>
              <td className='p-3'>
                {currency}{car.pricePerDay}/day
              </td>
              <td className='p-3 max-md:hidden'>
                  <motion.span 
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                    className={`px-3 py-1 rounded-full text-xs ${car.isAvailable ? 'bg-green-100 text-green-500' : 'bg-red-100 text-red-500'}`}>
                      {car.isAvailable ? 'Available' : 'Unavailable'}
                  </motion.span> 
              </td>
              <td className='flex items-center p-3'>
                <motion.img 
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => toggleAvailability(car._id)} 
                  src={car.isAvailable ? assets.eye_close_icon : assets.eye_icon} 
                  alt="" 
                  className='cursor-pointer'/>
                <motion.img 
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => deleteCar(car._id)} 
                  src={assets.delete_icon} 
                  alt="" 
                  className='cursor-pointer'/>
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

export default ManageCars
