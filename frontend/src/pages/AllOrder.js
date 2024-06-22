import React, { useEffect, useState } from 'react';
import moment from 'moment';
import SummaryApi from '../common';
import displayINRCurrency from '../helpers/displayCurrency';
import Context from '../context';
import { useContext } from 'react';
   
const AllOrder = () => {
    const {loading1,notloading1}=useContext(Context);

    const [data, setData] = useState([]);

    const fetchOrderDetails = async () => {
        loading1();
        const response = await fetch(SummaryApi.allOrder.url, {
            method: SummaryApi.allOrder.method,
            credentials: 'include'
        });

        const responseData = await response.json();
         notloading1();
        setData(responseData.data);
    };

    useEffect(() => {
        fetchOrderDetails();
    }, []);

    return (
        <div className='h-[calc(100vh-190px)] overflow-y-scroll'>
            {data.map((item, index) => {
                if (item.orders.length === 0) {
                    return null; // Skip rendering if orders array is empty
                }

                return (
                    <div key={index}>
                        <p className='font-medium text-lg'>User: {item.user.name}</p>
                        <p className='font-medium text-lg'>Order Date: {moment(item.orders[0].createdAt).format('LL')}</p>
                        <div className='border rounded p-2'>
                            <div className='flex flex-col lg:flex-row justify-between'>
                                <div className='grid gap-1'>
                                    {item.orders[0].productDetails.map((product, pIndex) => (
                                        <div key={product.productId + pIndex} className='flex gap-3 bg-slate-100'>
                                            <img src={product.image[0]} className='w-28 h-28 bg-slate-200 object-scale-down p-2' />
                                            <div>
                                                <div className='font-medium text-lg text-ellipsis line-clamp-1'>{product.name}</div>
                                                <div className='flex items-center gap-5 mt-1'>
                                                    <div className='text-lg text-red-500'>{displayINRCurrency(product.price)}</div>
                                                    <p>Quantity : {product.quantity}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className='flex flex-col gap-4 p-2 min-w-[300px]'>
                                    <div>
                                        <div className='text-lg font-medium'>Payment Details :</div>
                                        <p className='ml-1'>Payment method : {item.orders[0].paymentDetails.payment_method_type[0]}</p>
                                        <p className='ml-1'>Payment Status : {item.orders[0].paymentDetails.payment_status}</p>
                                    </div>
                                    <div>
                                        <div className='text-lg font-medium'>Shipping Details :</div>
                                        {item.orders[0].shipping_options.map((shipping, sIndex) => (
                                            <div key={sIndex} className='ml-1'>
                                                Shipping Amount : {shipping.shipping_amount}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className='font-semibold ml-auto w-fit lg:text-lg'>
                                Total Amount : {item.orders[0].totalAmount}
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default AllOrder;
