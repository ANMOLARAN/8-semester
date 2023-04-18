import React from 'react'
import Header from './Header'
import { useStateValue } from '../context/stateProvider';
import moment from 'moment'
import { CiUser } from "react-icons/ci";

function UserProfile() {
  const [{user},dispatch]=useStateValue();
  const createdAt=moment(new Date(user?.user?.createdAt)).format('MMMM Do YYYY');
  return (
    <div className='w-full'>
       <Header/>
       <div className='flex flex-column justify-center gap-4 text-center my-6 font-bold text-lg'>
       <CiUser className='text-3xl'/>
        <h1>User Information</h1>
       </div>
      <div className="w-full h-auto flex flex-col items-center my-4 justify-center bg-primary py-12 gap-6">
      <div className='flex flex-row items-center gap-6'>
      <h1 className='font-semibold'>User logo:</h1><img src={user?.user.imageURL} className='w-12 h-12 min-2-[44px] object-cover rounded-full shadow-lg' alt='' referrerPolicy='no-referrer'/>
      </div>
      <div className='flex flex-row items-center gap-2'>
        <h1 className='font-semibold text-textColor'>User Name:</h1>
          <p className='text-lg hover:text-headingColor font-semibold'>{user?.user?.name}</p>
      </div>
      <div className='flex flex-row items-center gap-2'>
        <h1 className='font-semibold text-textColor'>User Email:</h1>
          <p className='text-lg hover:text-headingColor font-semibold'>{user?.user?.email}</p>
      </div>
      <div className='flex flex-row items-center gap-2'>
        <h1 className='font-semibold text-textColor'>User Role:</h1>
          <p className='text-lg hover:text-headingColor font-semibold'>{user?.user?.role}</p>
      </div>
      <div className='flex flex-row items-center gap-2'>
        <h1 className='font-semibold text-textColor'>Account Created At:</h1>
          <p className='text-lg hover:text-headingColor font-semibold'>{createdAt}</p>
      </div>
    </div>
    </div>
  )
}

export default UserProfile
