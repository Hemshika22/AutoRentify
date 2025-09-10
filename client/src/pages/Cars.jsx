import React, { useEffect, useState } from 'react'
import CarDetails from './CarDetails'
import Title from '../components/Title'
import { FaSearch } from 'react-icons/fa'
import { assets, dummyCarData } from '../assets/assets'
import CarCard from '../components/CarCard'
import Footer from '../components/Footer'
import { useSearchParams } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'
import toast from 'react-hot-toast'
import { motion, AnimatePresence } from 'motion/react'

const Cars = () => {

  //getting search params from url
  const [searchParams] = useSearchParams()
  const pickupLocation = searchParams.get('pickupLocation')
  const pickupDate = searchParams.get('pickupDate')
  const returnDate = searchParams.get('returnDate')

  const {cars, axios} = useAppContext();

   const [input, setInput] = useState("")

   const isSearchData = pickupLocation && pickupDate && returnDate
   const [filteredCars, setFilteredCars] = useState([])

   const applyFiler = async ()=>{
    if(input === ''){
      setFilteredCars(cars)
      return null
    }

   const filtered = cars.slice().filter((car)=> {
    return car.brand.toLowerCase().includes(input.toLowerCase())
    || car.model.toLowerCase().includes(input.toLowerCase())
    || car.category.toLowerCase().includes(input.toLowerCase())
    || car.transmission.toLowerCase().includes(input.toLowerCase())
   })
   setFilteredCars(filtered)
  }

   const searchCarAvailability = async () => {
      const {data} = await axios.post('/api/bookings/check-availability', 
        {location: pickupLocation, pickupDate, returnDate})
      if(data.success) {
        setFilteredCars(data.availableCars)
        if(data.availableCars.length === 0) {
          toast('No cars available for the given date range')
        }
        return null
      }
    } 

    useEffect(()=>{
      isSearchData && searchCarAvailability()
    },[])

    useEffect(()=>{
      cars.length > 0 && !isSearchData && applyFiler()
    },[input, cars])
   
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className='min-h-screen bg-gray-50'>
      
      {/* Header Section */}
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className='flex flex-col items-center py-16 md:py-20 bg-gradient-to-br from-blue-50 to-indigo-100 px-4'>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}>
          <Title title="Available Cars" subtitle="Choose your favorite car" />
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className='flex items-center bg-white px-4 mt-8 max-w-2xl w-full h-14 rounded-full shadow-lg border border-gray-200'>
          <img src={assets.search_icon} alt="Search Icon" className='w-5 h-5 mr-3 text-gray-400'/>

          <input 
            onChange={(e) => setInput(e.target.value)} 
            value={input} 
            type="text" 
            placeholder='Search by make, model, or keyword' 
            className='flex-1 outline-none border-none text-sm text-gray-700 placeholder-gray-400 h-full w-full rounded-full' />

          <motion.img 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            src={assets.filter_icon} 
            alt="Filter Icon" 
            className='w-5 h-5 ml-3 text-gray-400 cursor-pointer'/>
        </motion.div>
      </motion.div>
      
      {/* Results Section */}
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className='px-4 md:px-6 lg:px-8 xl:px-16 -mt-8 pb-20'>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className='max-w-7xl mx-auto'>
          
          <div className='flex items-center justify-between mb-8'>
            <motion.p 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 1 }}
              className='text-gray-600 text-lg font-medium'>
              Showing {filteredCars.length} {filteredCars.length === 1 ? 'Car' : 'Cars'}
            </motion.p>
            
            {filteredCars.length > 0 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 1.1 }}
                className='text-sm text-gray-500'>
                {isSearchData ? 'Filtered by search criteria' : 'All available cars'}
              </motion.div>
            )}
          </div>

          {filteredCars.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.2 }}
              className='text-center py-16'>
              <div className='w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center'>
                <img src={assets.car_icon} alt="No cars" className='w-12 h-12 text-gray-400'/>
              </div>
              <h3 className='text-xl font-semibold text-gray-700 mb-2'>No cars found</h3>
              <p className='text-gray-500 mb-6'>
                {isSearchData 
                  ? 'Try adjusting your search criteria or date range' 
                  : 'No cars are currently available'}
              </p>
              {isSearchData && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => window.location.href = '/cars'}
                  className='px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors'>
                  View All Cars
                </motion.button>
              )}
            </motion.div>
          ) : (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1 }}
              className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
              <AnimatePresence mode="wait">
              {filteredCars.map((car, index) => (
                <motion.div 
                  key={car._id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -50 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}>
                  <CarCard car={car} />
                </motion.div>
              ))}
              </AnimatePresence>
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

export default Cars
