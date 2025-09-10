import React from 'react'
import { assets } from '../assets/assets'
import { motion } from 'motion/react'

const Banner = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className='flex flex-col md:flex-row md:items-start items-center justify-between
    px-8 min-md:pl-14 pt-10 bg-gradient-to-r from-[#1E3A8A] to-[#A9CFFF] max-w-6xl mx-3 md:mx-auto rounded-2xl overflow-hidden'>
    <motion.div 
      initial={{ opacity: 0, x: -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      viewport={{ once: true }}
      className='text-white'>
       <motion.h2 
         initial={{ opacity: 0, y: 20 }}
         whileInView={{ opacity: 1, y: 0 }}
         transition={{ duration: 0.6, delay: 0.4 }}
         viewport={{ once: true }}
         className='text-3xl font-medium'>Rent the car of your choice</motion.h2>
       <motion.p 
         initial={{ opacity: 0, y: 20 }}
         whileInView={{ opacity: 1, y: 0 }}
         transition={{ duration: 0.6, delay: 0.5 }}
         viewport={{ once: true }}
         className='mt-2'>Monetize your vehicle effortlessly by listing it on AutoRentify.</motion.p>
       <motion.p 
         initial={{ opacity: 0, y: 20 }}
         whileInView={{ opacity: 1, y: 0 }}
         transition={{ duration: 0.6, delay: 0.6 }}
         viewport={{ once: true }}>Join us today and start earning!</motion.p>

       <motion.button 
         initial={{ opacity: 0, y: 20 }}
         whileInView={{ opacity: 1, y: 0 }}
         transition={{ duration: 0.6, delay: 0.7 }}
         viewport={{ once: true }}
         whileHover={{ scale: 1.05 }}
         whileTap={{ scale: 0.95 }}
         className='px-6 py-2 bg-white hover:bg-gray-100 transition-all text-primary rounded-lg text-sm mt-4 cursor-pointer'>List your car</motion.button>
    </motion.div>
    <motion.img 
      initial={{ opacity: 0, x: 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 0.3 }}
      viewport={{ once: true }}
      src={assets.banner_car_image} alt="car" className='max-h-45 mt-10' />
      
    </motion.div>
  )
}

export default Banner
