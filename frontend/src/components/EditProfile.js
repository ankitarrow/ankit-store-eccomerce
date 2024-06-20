import React, { useContext, useState,useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { CgClose } from "react-icons/cg";
import SummaryApi from '../common';
import { toast } from 'react-toastify';
import { setUserDetails } from '../store/userSlice';
const EditProfile = ( {onClose}) => {
    const dispatch = useDispatch()
const user = useSelector(state => state?.user?.user)
const [data,setData] = useState({
Name : user?.name,
Address: user?.address,
Mob_NO: user?.mobile
      })
const handleOnChange = (e)=>{
    const { name, value} = e.target
    console.log(data);
    setData((preve)=>{
      return{
        ...preve,
        [name]  : value
      }
    })
}
const handleSubmit = async(e) =>{
    e.preventDefault()
    const fetchResponse = await fetch(SummaryApi.updateUser.url,{
        method : SummaryApi.updateUser.method,
        credentials : 'include',
        headers : {
            "content-type" : "application/json"
        },
        body : JSON.stringify({
            userId:user?._id,
            name : data.Name,
            address:data.Address,
            mobile:data.Mob_NO
        })
    })
    
    const responseData = await fetchResponse.json()

    if(responseData.success){
        toast.success(responseData.message)
        onClose()
    }

    dispatch(setUserDetails({
        ...user,
        name: data.Name,
        address: data.Address,
        mobile: data.Mob_NO
  
    }));
  

  }

  return (

    <div className='fixed w-full  h-full bg-slate-200 bg-opacity-35 top-0 left-0 right-0 bottom-0 flex justify-center items-center'>
    <div className='bg-white p-4 rounded w-full max-w-2xl h-full max-h-[80%] overflow-hidden'>

         <div className='flex justify-between items-center pb-3'>
             <h2 className='font-bold text-lg'>Edit Profile</h2>
             <div className='w-fit ml-auto text-2xl hover:text-red-600 cursor-pointer' onClick={onClose} >
                 <CgClose/>
             </div>
         </div>

       <form className='grid p-4 gap-2 overflow-y-scroll h-full pb-5' onSubmit={handleSubmit}>
         <label htmlFor='Name'>Name :</label>
         <input 
           type='text' 
           id='Name' 
           placeholder='enter product name' 
           name='Name'
           value={data.Name} 
           onChange={handleOnChange}
           className='p-2 bg-slate-100 border rounded'
           required
         />
         <label htmlFor='Mobile'>Mobile No:</label>
         <input 
           type='text' 
           id='Mob_NO' 
           placeholder='enter product name' 
           name='Mob_NO'
           value={data.Mob_NO} 
           onChange={handleOnChange}
           className='p-2 bg-slate-100 border rounded'
           required
         />
         <label htmlFor='Address'>Address :</label>
         <input 
           type='text' 
           id='Address' 
           placeholder='enter product name' 
           name='Address'
           value={data.Address} 
           onChange={handleOnChange}
           className='p-2 bg-slate-100 border rounded'
           required
         />
                        



           <button className='px-3 py-2 bg-red-600 text-white mb-10 hover:bg-red-700'>Update Profile</button>
       </form> 



   
    </div> 

 </div>
    
  )
}

export default EditProfile