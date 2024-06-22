import React, { useContext, useState } from 'react'
import Logo from './Logo'
import { GrSearch } from "react-icons/gr";
import { FaRegCircleUser } from "react-icons/fa6";
import { FaShoppingCart } from "react-icons/fa";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import SummaryApi from '../common';
import { toast } from 'react-toastify'
import { setUserDetails } from '../store/userSlice';
import ROLE from '../common/role';
import Context from '../context';
import EditProfile from './EditProfile';
import { TbLayoutNavbarExpand } from "react-icons/tb";
   
const Header = () => {
  const order = () =>{
    setMenuDisplay(preve => !preve);
    
    setcss1("r1");
  }
  const csschanger=()=>{
    if(css1==="r1")
    {
      setcss1("r");
    }
    else
    {
      setcss1("r1");
    }
  }
  const log=()=>{
    setcss1("r1");
  }
  const {loading1,notloading1}=useContext(Context);

  const [css1,setcss1]=useState("r1");
  const user = useSelector(state => state?.user?.user)
  const dispatch = useDispatch()
  const [menuDisplay,setMenuDisplay] = useState(false)
  const context = useContext(Context)
  const navigate = useNavigate()
  const searchInput = useLocation()
  const URLSearch = new URLSearchParams(searchInput?.search)
  const searchQuery = URLSearch.getAll("q")
  const [search,setSearch] = useState(searchQuery)
  const [edit,newedit] = useState(false);
  const handleLogout = async() => {
    loading1();
    const fetchData = await fetch(SummaryApi.logout_user.url,{
      method : SummaryApi.logout_user.method,
      credentials : 'include'
    })

    const data = await fetchData.json()
    notloading1();
    if(data.success){
      setcss1("r");
      toast.success(data.message)
      dispatch(setUserDetails(null))
      navigate("/")
    }

    if(data.error){
      toast.error(data.message)
    }

  }

  const handleSearch = (e)=>{
    const { value } = e.target
    setSearch(value)

    if(value){
      navigate(`/search?q=${value}`)
    }else{
      navigate("/search")
    }
  }
  function dialog(){
    setMenuDisplay(preve => !preve);
    newedit(preve => !preve);

  }
  return (
    <header className='h-16 shadow-md bg-white fixed w-full z-40'>
   
      <div className=' h-full container mx-auto flex items-center px-4 justify-between'>


            <div className='scale-125 hover:scale-150'>
                <Link to={"/"}>
                    <Logo w={90} h={50}/>
                </Link>
            </div>

            <div className='flex items-center w-full justify-between max-w-sm border rounded-full focus-within:shadow pl-2' id='t'>
                <input type='text' placeholder='search product here...' className='w-full outline-none' onChange={handleSearch} value={search}/>
                <div className='text-lg min-w-[50px] h-8 bg-red-600 flex items-center justify-center rounded-r-full text-white hover:scale-125'>
                  <GrSearch />
                </div>
            </div>

            <div className='flex items-center gap-7'>
            <div className='flex items-center gap-7' id={css1}>
                
                <div className='relative flex justify-center'>

                  {
                    user?._id && (
                      <div className='text-3xl cursor-pointer relative flex justify-center hover:scale-110' id='f' onClick={()=>setMenuDisplay(preve => !preve)}>
                        {
                          user?.profilePic ? (
                            <img src={user?.profilePic} className='w-10 h-10 rounded-full' alt={user?.name} />
                          ) : (
                            <FaRegCircleUser/>
                          )
                        }
                      </div>
                    )
                  }
                  
                  
                  {
                    menuDisplay && (
                      <div className='absolute bg-white bottom-0 top-11 h-fit p-2 shadow-lg rounded' >
                        <nav>
                          {
                            user?.role === ROLE.ADMIN && (
                              <Link to={"/admin-panel/all-products"} className='whitespace-nowrap hidden md:block hover:bg-slate-100 p-2' onClick={()=>setMenuDisplay(preve => !preve)}>Admin Panel</Link>
                            )
                          }
                          <Link to={'/order'} className='whitespace-nowrap block hover:bg-slate-100 p-2' onClick={order}>Order</Link>
                         
                         <Link to={""} className='whitespace-nowrap block hover:bg-slate-100 p-2' onClick={dialog}>Edit Profile</Link>

                        </nav>
                      </div>
                    )
                  }
                 
                 {edit &&(
                      <EditProfile  onClose={()=>newedit(false)} />
                    )
                    }
                </div>

                  {
                     user?._id && (
                      <Link to={"/cart"} className='text-2xl relative' id="f1">
                          <button className='mt-2' onClick={csschanger}><FaShoppingCart/></button>
      
                          <div className='bg-red-600 text-white w-5 h-5 rounded-full p-1 flex items-center justify-center absolute -top-2 -right-3 mt-2'>
                              <p className='text-sm'>{context?.cartProductCount}</p>
                          </div>
                      </Link>
                      )
                  }
              


                <div id="f1">
                  {
                    user?._id  ? (
                      <button onClick={handleLogout} className='px-3 py-1 rounded-full text-white bg-red-600 hover:bg-red-700'>Logout</button>
                    )
                    : (
                    <Link to={"/login"}  className='px-3 py-1 rounded-full text-white bg-red-600 hover:bg-red-700'><button onClick={log}>Login</button></Link>
                    )
                  }
                    
                </div>
            </div>
            <div>
                 <button className='lg:hidden scale-150' onClick={csschanger}><TbLayoutNavbarExpand/></button>
                 </div>
            </div>
      </div>
    </header>
  )
}

export default Header
