import React, { useState } from 'react';
import loginIcons from '../assest/signin.gif';
import { useNavigate,useParams } from 'react-router-dom';
import SummaryApi from '../common';
import { toast } from 'react-toastify';

const ResetPassword = () => {
    const { token } = useParams();
    const [data, setData] = useState({
        password: "",
    });
    const navigate = useNavigate();

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        console.log(SummaryApi.ForgotPassword.url);
        e.preventDefault();
        try {
            const response = await fetch(`${SummaryApi.ResetPassword.url}/${token}`, {
                method: SummaryApi.ResetPassword.method,
                credentials: 'include',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            const result = await response.json();

            if (result.success) {
                navigate('/');
                toast.success(result.message);
 
            } else {
                toast.error(result.message);
            }
        } catch (error) {
            toast.error("An error occurred. Please try again.");
        }
    };

    return (
        <section id='reset-password'>
            <div className='mx-auto container p-4'>
                <div className='bg-white p-5 w-full max-w-sm mx-auto'>
                    <div className='w-20 h-20 mx-auto'>
                        <img src={loginIcons} alt='Reset Password' />
                    </div>
                    <form className='pt-6 flex flex-col gap-2' onSubmit={handleSubmit}>
                        <div className='grid'>
                            <label>Password: </label>
                            <div className='bg-slate-100 p-2'>
                                <input
                                    type='password'
                                    placeholder='Enter new password'
                                    name='password'
                                    value={data.password}
                                    onChange={handleOnChange}
                                    className='w-full h-full outline-none bg-transparent'
                                    required
                                />
                            </div>
                        </div>
                        <button
                            type='submit'
                            className='bg-red-600 hover:bg-red-700 text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-6'>
                            Change Password
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default ResetPassword;
