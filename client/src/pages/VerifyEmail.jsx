import React, { useState } from 'react'
import HomeLayout from '../components/HomeLayout'
import OtpInput from "react-otp-input";
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../redux/slices/authSlice';
import Spinner from '../components/Spinner';
import { useNavigate } from 'react-router-dom';

function VerifyEmail() {
    const [loading,setLoading] = useState(false);
    const [otp, setOtp] = useState(null);
    const { signData } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const onFormSubmit = async (e) => {
        try {
            e.preventDefault();
            setLoading(true);
            const {
                firstName,
                lastName,
                email,
                phone,
                answer,
                password,
                avatar,
            } = signData;

            const formData = new FormData();

            formData.append('firstName', firstName);
            formData.append('lastName', lastName);
            formData.append('email', email);
            formData.append('phone', phone);
            formData.append('answer', answer);
            formData.append('avatar', avatar);
            formData.append('otp', otp);
            formData.append('password', password);

            const res = await dispatch(register(formData));
            // console.log(res);
            navigate('/login');
            setLoading(false);
            

        } catch (Error) {
            console.log(Error);
        }
    }

    return (
        <HomeLayout>
            <div className='flex items-center  justify-center min-h-screen'>
               {
                loading 
                ? (<Spinner />) 
                : ( <form onSubmit={onFormSubmit}>
                    <OtpInput
                        value={otp}
                        onChange={setOtp}
                        numInputs={6}
                        renderInput={(props) => (
                            <input
                                {...props}
                                placeholder='-'
                            />
                        )}
                    />
                    <button type='submit'>Vefiry</button>
                </form>)
               }
            </div>
        </HomeLayout>
    )
}

export default VerifyEmail