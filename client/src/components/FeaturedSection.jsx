import React from 'react'
import Title from './Title'
import { assets, dummyCarData } from '../assets/assets'
import CarCard from './CarCard'
import { useNavigate } from 'react-router-dom'
import CarDetails from '../pages/CarDetails'
import { useAppContext } from '../context/AppContext'
import { motion } from 'motion/react'

const FeaturedSection = () => {

  const navigate = useNavigate()
  const {cars} = useAppContext()

  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className='flex flex-col items-center py-24 px-6 md:px-16 lg:px-24 xl:px-32'>
       <motion.div
         initial={{ opacity: 0, y: 30 }}
         whileInView={{ opacity: 1, y: 0 }}
         transition={{ duration: 0.6, delay: 0.2 }}
         viewport={{ once: true }}>
        <Title title='Featured vehicles' subtitle='Browse our selection of top-rated vehicles' align='center'/>
       </motion.div>
       <motion.div 
         initial={{ opacity: 0 }}
         whileInView={{ opacity: 1 }}
         transition={{ duration: 0.8, delay: 0.4 }}
         viewport={{ once: true }}
         className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-18'>
        {
          cars.slice(0,6).map((car, index)=> (
            <motion.div 
              key={car._id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}>
               <CarCard car={car} />
            </motion.div>
           
          ))
        }
       </motion.div>
       <motion.button 
         initial={{ opacity: 0, y: 30 }}
         whileInView={{ opacity: 1, y: 0 }}
         transition={{ duration: 0.6, delay: 0.8 }}
         viewport={{ once: true }}
         whileHover={{ scale: 1.05 }}
         whileTap={{ scale: 0.95 }}
         onClick={()=> {
        navigate('/cars'); scrollTo(0,0)
       }}
       className='flex items-center justify-center gap-2 px-6 py-2 border border-borderColr hover:bg-gray-50 rounded-md mt-18 cursor-pointer'>
        Explore All Vehicles <img src={assets.arrow_icon} alt="arrow" className='inline-block ml-2' />
       </motion.button>
    </motion.div>
  )
}

export default FeaturedSection
