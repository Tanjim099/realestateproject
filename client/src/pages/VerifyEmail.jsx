import React, { useState } from 'react'
import HomeLayout from '../components/HomeLayout'
import OtpInput from "react-otp-input";
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../redux/slices/authSlice';

function VerifyEmail() {
    const [otp, setOtp] = useState(null);
    const { signData } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const onFormSubmit = async (e) => {
        try {
            e.preventDefault();

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

            console.log(res);

        } catch (Error) {
            console.log(Error);
        }
    }

    return (
        <HomeLayout>
            <div className='flex items-center  justify-center min-h-screen'>
                <form onSubmit={onFormSubmit}>
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
                </form>
            </div>
        </HomeLayout>
    )
}

export default VerifyEmail