import React from 'react'
import {Link} from 'react-router-dom'
const Footer = () => {
  return (
    <footer class="bg-gray-800 text-white py-4 px-3 mt-16">
    <div class="container mx-auto flex flex-wrap items-center justify-between">
        <div class="w-full md:w-1/2 md:text-center md:mb-0 mb-8">
            <p class="text-xs text-gray-400 md:text-sm">Copyright 2024 &copy; All Rights Reserved</p>
        </div>
        <div class="w-full md:w-1/2 md:text-center md:mb-0 mb-8">
        <ul className='flex justify-between'>
      <li>
        <Link to="/contact" className="text-gray-400 hover:text-white">
          Contact
        </Link>
      </li>
      <li className="mx-4">
        <Link to="/" className="text-gray-400 hover:text-white">
          Privacy Policy
        </Link>
      </li>
      <li>
        <Link to="/" className="text-gray-400 hover:text-white">
          Terms of Use
        </Link>
      </li>
    </ul>
        </div>
    </div>
</footer>  )
}

export default Footer