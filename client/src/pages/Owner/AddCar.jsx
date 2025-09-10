import React, { useState } from 'react';
import Title from '../../components/owner/Title';
import { assets } from '../../assets/assets';
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';
import { motion } from 'motion/react';

const AddCar = () => {

  const {axios, currency} = useAppContext();

  const [image, setImage] = useState(null);
  const [car, setCar] = useState({

  brand: '',
  model: '',
  year: 0 ,
  category: '',
  pricePerDay: 0,
  seating_capacity: 0,
  fuel_type: '',
  transmission: '',
  location: '',
  description: '',
});

const [isLoading, setIsLoading] = useState(false);
const onSubmitHandler = async (e) => {
  e.preventDefault();
  if(isLoading) return null

  setIsLoading(true);
  try {
    const formData = new FormData();
    formData.append('image', image);
    formData.append('carData', JSON.stringify(car));

    const {data} = await axios.post('/api/owner/add-car', formData);
    if(data.success) {
      toast.success(data.message);
      setImage(null);
      setCar( {
        brand: '',
        model: '',
        year: 0,
        pricePerDay: 0,
        category: '',
        seating_capacity: 0,
        fuel_type: '',
        transmission: '',
        location: '',
        description: '',
      })
    } else {
      toast.error(data.message);
    }
  } catch (error) {
    toast.error(error.message);
  } finally {
  setIsLoading(false);
  }
}

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className='px-4 py-10 md:px-10 flex-1'>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}>
        <Title title="Add New Car" subtitle="Fill in details to list a new car for booking, including pricing. availability, and other relevant information."/>
      </motion.div>

      <motion.form 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        onSubmit={onSubmitHandler}
        className='flex flex-col gap-5 text-gray-500 text-sm mt-6 max-w-xl'>

      {/* car image */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className='flex items-center gap-2 w-full'>
        <label htmlFor="car-image">
          <motion.img 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            src={image ? URL.createObjectURL(image) : assets.upload_icon} alt="" className='h-14 rounded cursor-pointer'/>
          <input type='file' id='car-image' accept='image/*' hidden onChange={e => 
          setImage(e.target.files[0])}/>
        </label> 
        <p className='text-sm text-gray-500 '> Upload a picture of your car</p>
      </motion.div>

      {/* car brand & model */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className='flex flex-col w-full'>
          <label>Brand</label>
          <input type='text' placeholder='e.g. BMW, Mercedes, Toyota, Audi....' required
            className='px-3 py-2 ,t-1 border border-borderColor rounded-md outline-none' 
            value={car.brand} onChange={e => setCar({...car, brand: e.target.value})}/>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className='flex flex-col w-full'>
          <label>Model</label>
          <input type='text' placeholder='e.g. X5, Cayenne, Yaris, A3...' required
            className='px-3 py-2 ,t-1 border border-borderColor rounded-md outline-none' 
            value={car.model} onChange={e => setCar({...car, model: e.target.value})}/>
        </motion.div>
      </motion.div>

      {/* car year, price, category */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1 }}
        className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 1.2 }}
          className='flex flex-col w-full'>
          <label>Year</label>
          <input type='number' placeholder='2025' required
            className='px-3 py-2 ,t-1 border border-borderColor rounded-md outline-none' 
            value={car.year} onChange={e => setCar({...car, year: e.target.value})}/>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 1.2 }}
          className='flex flex-col w-full'>
          <label>Daily Price ({currency})</label>
          <input type='number' placeholder='100' required
            className='px-3 py-2 ,t-1 border border-borderColor rounded-md outline-none' 
            value={car.pricePerDay} onChange={e => setCar({...car, pricePerDay: e.target.value})}/>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.4 }}
          className='flex flex-col w-full'>
          <label>Category</label>
          <select onChange={e => setCar({...car, category: e.target.value})} 
          value={car.category} className='px-3 py-2 mt-1 border border-borderColor rounded-md outline-none'>
            <option value="">Select a Category</option>
            <option value="Sedan">Sedan</option>
            <option value="SUV">SUV</option>
            <option value="Van">Van</option>
          </select>
        </motion.div>
      </motion.div>



        {/* car transmission. fuel type. seating capacity */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.4 }}
          className='grid grid-cols-1 md:grid-cols-2 gap-6'>
           <motion.div 
             initial={{ opacity: 0, x: -20 }}
             animate={{ opacity: 1, x: 0 }}
             transition={{ duration: 0.5, delay: 1.6 }}
             className='flex flex-col w-full'>
          <label>Transmission</label>
          <select onChange={e => setCar({...car, transmission: e.target.value})} 
          value={car.transmission} className='px-3 py-2 mt-1 border border-borderColor rounded-md outline-none'>
            <option value="">Select a transmission</option>
            <option value="Automatic">Automatic</option>
            <option value="Manual">Manual</option>
            <option value="Semi-Automatic">Semi-Automatic</option>
          </select>
        </motion.div>
         <motion.div 
           initial={{ opacity: 0, x: 20 }}
           animate={{ opacity: 1, x: 0 }}
           transition={{ duration: 0.5, delay: 1.6 }}
           className='flex flex-col w-full'>
          <label>Fuel Type</label>
          <select onChange={e => setCar({...car, fuel_type: e.target.value})} 
          value={car.fuel_type} className='px-3 py-2 mt-1 border border-borderColor rounded-md outline-none'>
            <option value="">Select a fuel type</option>
            <option value="Gas">Gas</option>
            <option value="Diesel">Diesel</option>
            <option value="Petrol">Petrol</option>
            <option value="Electric">Electric</option>
          </select>
        </motion.div>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.8 }}
          className='flex flex-col w-full'>
          <label>Seating Capacity</label>
          <input type='number' placeholder='4' required
            className='px-3 py-2 ,t-1 border border-borderColor rounded-md outline-none' 
            value={car.seating_capacity} onChange={e => setCar({...car, seating_capacity: e.target.value})}/>
        </motion.div>
        </motion.div>

        {/* car location */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.8 }}
          className='flex flex-col w-full'>
          <label>Location</label>
          <select onChange={e => setCar({...car, location: e.target.value})} 
          value={car.location} className='px-3 py-2 mt-1 border border-borderColor rounded-md outline-none'>
            <option value="">Select a location</option>
            <option value="India">India</option>
            <option value="Chicago">Chicago</option>
            <option value="New York">New York</option>
            <option value="London">London</option>
          </select>
        </motion.div>

        {/* description */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 2 }}
          className='flex flex-col w-full'>
          <label>Description</label>
          <textarea placeholder='e.g. The car is in good condition, has all the features, and is ready to be rented.' required
            className='px-3 py-2 ,t-1 border border-borderColor rounded-md outline-none' 
            value={car.description} onChange={e => setCar({...car, description: e.target.value})}/>
        </motion.div>

        <motion.button 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 2.2 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className='flex items-centergap-2 px-4 py-2.5 mt-4 bg-primary text-white rounded-md font-medium w-max cursor-pointer'>
          <img src={assets.tick_icon} alt="" />
          {isLoading ? 'Listing...' : 'List Your Car'}
        </motion.button>
      </motion.form>
    </motion.div>
  );
};

export default AddCar;
