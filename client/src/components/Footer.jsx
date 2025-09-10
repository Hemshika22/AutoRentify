import React from 'react'
import { assets } from '../assets/assets'
import { FaEnvelope, FaFacebook, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';

const Footer = () => {
  return (
           <div className='px--6 md:px-16 lg:px-24 xl:px-32 mt-60 text-sm text-gray-500'>
            <div className='flex flex-wrap justify-between items-start gap-8 pb-6 border-borderColor'>
                <div>
                    <img src={assets.navLogo} alt="logo" className='h-20 w-30 md:h-20 md:w-20' />
                    <p className='max-w-80 mt-3'>
                        AutoRentify is your go-to platform for renting and listing vehicles with ease and confidence.
                    </p>
                    <div className='flex items-center gap-3 mt-6'>
                       <a href='#' className='text-gray-500 hover:text-pink-800'> <FaInstagram  className='h-7 w-7'/></a>
                       <a href='#' className='text-gray-500 hover:text-blue-800'> <FaFacebook  className='h-7 w-7'/></a>
                       <a href='#' className='text-gray-500 hover:text-gray-800'> <FaTwitter  className='h-7 w-7'/></a>
                       <a href='#' className='text-gray-500 hover:text-red-800'> <FaYoutube  className='h-7 w-7'/></a>
                       <a href='#' className='text-gray-500 hover:text-blue-800'> <FaEnvelope  className='h-7 w-7'/></a>
                    </div>
                </div>

                <div>
                    <h2 className='text-base font-medium text-gray-800 uppercase'>Quick Links</h2>
                    <ul className='mt-3 flex flex-col gap-2 text-sm'>
                        <li><a href="#">Home</a></li>
                        <li><a href="#">Browse Cars</a></li>
                        <li><a href="#">List Your Cars</a></li>
                        <li><a href="#">About Us</a></li>
                    </ul>
                </div>

                <div>
                    <h2 className='text-base font-medium text-gray-800 uppercase'>Resources</h2>
                    <ul className='mt-3 flex flex-col gap-2 text-sm'>
                        <li><a href="#">Help Center</a></li>
                        <li><a href="#">Terms of Service</a></li>
                        <li><a href="#">Privacy Policy</a></li>
                        <li><a href="#">Insurance</a></li>
                    </ul>
                </div>

                <div>
                    <h2 className='text-base font-medium text-gray-800 uppercase'>Contact</h2>
                    <ul className='mt-3 flex flex-col gap-2 text-sm'>
                        <li><a href="#">1234 XYZ Street</a></li>
                        <li><a href="#">City, State, 12345</a></li>
                        <li><a href="#">Email: info@autorentify.com</a></li>
                        <li><a href="#">Phone: (123) 456-7890</a></li>
                    </ul>
                </div>
                </div>


            <hr className='border-gray-300 mt-8' />
            <div className='flex flex-col md:flex-row gap-2 items-center justify-between py-5'>
                <p>© {new Date().getFullYear()} Brand. All rights reserved.</p>
                <ul className='flex items-center gap-4'>
                    <li><a href="#">Privacy</a></li>
                    <li>|</li>
                    <li><a href="#">Terms</a></li>
                    <li>|</li>
                    <li><a href="#">Sitemap</a></li>
                </ul>
            </div>
        </div>

  )
}

export default Footer
