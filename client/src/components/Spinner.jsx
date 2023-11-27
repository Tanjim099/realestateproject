import React from 'react'
import loader from '../assets/loder.png';

function Spinner() {
    return (
        <div className='flex items-center justify-center h-screen'>
            <div className="custom-loader"></div>
            <img className='absolute' src={loader} alt='loader' />
        </div>
    )
}

export default Spinner