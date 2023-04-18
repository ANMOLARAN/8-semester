import React from 'react'
import Header from './Header'
import {Esewa} from '../assests/img';
function Premium() {
  return (
    <div className='flex flex-col w-full h-[100vh]'>
       <Header className='grow'/>
       <div className='w-full grow flex justify-center bg-primary my-12 rounded-lg'>
       <img src={Esewa} alt='Logo' className='w-[150px] h-[150px] my-auto'/>
       </div>
    </div>
  )
}

export default Premium
