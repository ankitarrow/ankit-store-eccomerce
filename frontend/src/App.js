import './App.css';
import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from 'react';
import SummaryApi from './common';
import Context from './context';
import { useDispatch } from 'react-redux';
import { setUserDetails } from './store/userSlice';
import Loader from './components/Loader';

function App() {
  
  const dispatch = useDispatch()
  const [cartProductCount,setCartProductCount] = useState(0)
  const [loader,setLoader] = useState(false)
  const loading1=()=>{
    setLoader(true);
  }
  const notloading1=()=>{
    setLoader(false);
  }
  const fetchUserDetails = async()=>{
      loading1();
      const dataResponse = await fetch(SummaryApi.current_user.url,{
        method : SummaryApi.current_user.method,
        credentials : 'include'
      })

      const dataApi = await dataResponse.json()
       notloading1();
       
      if(dataApi.success){
        dispatch(setUserDetails(dataApi.data))
      }
  }

  const fetchUserAddToCart = async()=>{
    loading1();
    const dataResponse = await fetch(SummaryApi.addToCartProductCount.url,{
      method : SummaryApi.addToCartProductCount.method,
      credentials : 'include'
    })

    const dataApi = await dataResponse.json()
    notloading1();
    setCartProductCount(dataApi?.data?.count)
  }

  useEffect(()=>{
    /**user Details */
    fetchUserDetails()
    /**user Details cart product */
    fetchUserAddToCart()

  },[])
  return (
    <>
      <Context.Provider value={{
          fetchUserDetails, // user detail fetch 
          cartProductCount, // current user add to cart product count,
          fetchUserAddToCart,
          setLoader,
          loading1,
          notloading1
      }}>
        <ToastContainer 
          position='top-center'
        />
        {loader && <Loader />}

        
        <Header/>
         <main className='min-h-[calc(100vh-120px)] pt-16'>
          <Outlet/>
        </main>
        <Footer/>
      </Context.Provider>
    </>
  );
}

export default App;
