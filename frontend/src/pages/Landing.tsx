import React from 'react'
import { useNavigate } from 'react-router-dom'

const Landing = () => {


    const navigate = useNavigate()

    return (
        <div className='flex justify-center mx-auto items-center min-h-screen max-w-2xl'>
            <div className='grid items-center justify-center grid-cols-1 w-full md:grid-cols-2 gap-4'>
                <div className=''>
                    <img src="./chess.png" alt="chess image" />
                </div>
                <div className='text-white justify-center items-center flex flex-col gap-4'>
                    <h1 className='text-4xl font-bold'>Play Chess Online</h1>
                    <button onClick={() => navigate('/game')} className='bg-green-400 p-2 w-fit rounded-md'>
                        Play Online
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Landing