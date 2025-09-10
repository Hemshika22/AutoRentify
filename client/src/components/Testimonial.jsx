import React from 'react'
import Title from './Title'
import { assets } from '../assets/assets';
import { motion } from 'motion/react';

const Testimonial = () => {

         const testimonials = [
        {name: "Emma Rodriguez", 
        location: "Barcelona, Spain", 
        image: assets.testimonial_image_1, 
        testimonial: "I had an amazing experience with this service!" 
    },
        {name: "Liam Johnson", 
        location: "New York, USA", 
        image: assets.testimonial_image_2, 
        testimonial: "I’m truly impressed by the quality and consistency. The entire process was smooth, and the results exceeded all expectations. Thank you!" 
    },
        {name: "Sophia Lee", 
        location: "Seoul, South Korea", 
        image: assets.testimonial_image_1, 
        testimonial: "Fantastic experience! From start to finish, the team was professional, responsive, and genuinely cared about delivering great results." 
    }
    ];
  return (
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="py-28 px-6 md:px-16 lg:px-24 xl:px-44">
           <motion.div
             initial={{ opacity: 0, y: 30 }}
             whileInView={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.6, delay: 0.2 }}
             viewport={{ once: true }}>
             <Title title="What Our Customers Say" subtitle="Discover the experiences of our satisfied customers." />
           </motion.div>

            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-18">
                {testimonials.map((testimonial, index) => (
                    <motion.div 
                      key={index}
                      initial={{ opacity: 0, y: 50 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.2 }}
                      viewport={{ once: true }}
                      whileHover={{ y: -10, transition: { duration: 0.3 } }}
                      className="bg-white p-6 rounded-xl shadow-lg hover:-translate-y-1 transition-all duration-500">
                        <div className="flex items-center gap-3">
                            <img className="w-12 h-12 rounded-full" 
                            src={testimonial.image} alt={testimonial.name} />
                            <div>
                                <p className="font-playfair text-xl">{testimonial.name}</p>
                                <p className="text-gray-500">{testimonial.location}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-1 mt-4">
                            {Array(5).fill(0).map((_, starIndex) => (
                                <motion.img 
                                  key={starIndex} 
                                  initial={{ opacity: 0, scale: 0 }}
                                  whileInView={{ opacity: 1, scale: 1 }}
                                  transition={{ duration: 0.3, delay: 0.5 + starIndex * 0.1 }}
                                  viewport={{ once: true }}
                                  src={assets.star_icon} alt="star-icon" className="w-4 h-4" />
                            ))}
                        </div>
                        <p className="text-gray-500 max-w-90 mt-4 font-light">"{testimonial.testimonial}"</p>
                    </motion.div>
                ))}
            </motion.div>
        </motion.div>
  )
}

export default Testimonial
