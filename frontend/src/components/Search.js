import React, { useContext, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import SummaryApi from '../common';

import { GrSearch } from 'react-icons/gr'
const Search = () => {
    const navigate = useNavigate()
    const searchInput = useLocation()
    const URLSearch = new URLSearchParams(searchInput?.search)
    const searchQuery = URLSearch.getAll("q")  
    const [search,setSearch] = useState(searchQuery)
  
    const handleSearch = (e)=>{
        const { value } = e.target
        setSearch(value)
    
        if(value){
          navigate(`/search?q=${value}`)
        }else{
          navigate("/search")
        }
      }
let lastScrollTop = 0;
window.addEventListener("scroll", function() {
  let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  if (window.location.pathname === '/' || window.location.pathname.startsWith('/search')) {
    if (scrollTop > lastScrollTop) {
      // Scroll down
      document.getElementById("a").classList.add("hidden");
    } else {
      // Scroll up
      document.getElementById("a").classList.remove("hidden");
    }
  } else {
    // Not on the root route or search route, hide the search component
    document.getElementById("a").classList.add("hidden");
  }
  lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // For Mobile or negative scrolling
}, false);
window.addEventListener("click", function() {
  if (window.location.pathname === '/' || window.location.pathname.startsWith('/search')) {
  
    document.getElementById("a").classList.remove("hidden");
  }
  else {
    document.getElementById("a").classList.add("hidden");
  }
},false)

  return (
    <div  className='fixed top-20 ' id="a">
      <div className='flex items-center w-full  max-w-sm border rounded-full focus-within:shadow pl-2 fixed top-20' >
                <input type='text' placeholder='search product here...' className='w-full outline-none' onChange={handleSearch} value={search}/>
                <div className='text-lg min-w-[50px] h-8 bg-red-600 flex items-center justify-center rounded-r-full text-white hover:scale-125'>
                  <GrSearch />
                </div>
            </div>
    </div>
  )
}

export default Search
