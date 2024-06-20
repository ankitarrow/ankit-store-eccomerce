import React, { useState } from 'react';
import { CgClose } from 'react-icons/cg';
import SummaryApi from '../common';
import { toast } from 'react-toastify';

const DeleteProduct = ({
  onClose,
  productData,
  fetchdata
}) => {
  const data = {
    _id: productData?._id
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch(SummaryApi.deleteProduct.url, {
        method: SummaryApi.deleteProduct.method,
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      const responseData = await response.json();

      if (responseData.success) {
        toast.success(responseData.message);
        onClose();
        fetchdata();
      } else {
        toast.error(responseData.message);
      }
    } catch (error) {
      toast.error('An error occurred while deleting the product.');
    }
  };

  return (
    <div className='fixed w-full h-full bg-slate-200 bg-opacity-100 top-0 left-0 right-0 bottom-0 flex justify-center items-center'>
      <div className='bg-white p-4 rounded w-full max-w-2xl h-full max-h-[40%] overflow-hidden'>
        <div className='flex justify-between items-center pb-3'>
          <h2 className='font-bold text-lg'>Delete Product</h2>
          <div className='w-fit ml-auto text-2xl hover:text-red-600 cursor-pointer' onClick={onClose}>
            <CgClose />
          </div>
        </div>
        <div>
          <h2 className='text-center mt-4'>Do you want to delete this product?</h2>
        </div>
        <div className='flex justify-evenly mt-5'>
          <button className='bg-green-200 rounded w-25 hover:bg-green-600' onClick={handleSubmit}>Yes</button>
          <button className='bg-red-200 rounded w-25 hover:bg-red-600' onClick={onClose}>No</button>
        </div>
      </div>
    </div>
  );
};

export default DeleteProduct;
