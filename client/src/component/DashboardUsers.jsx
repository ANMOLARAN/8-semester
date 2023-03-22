import React, { useEffect, useState } from 'react'
import { useStateValue } from '../context/stateProvider'
import {motion} from 'framer-motion'
import {MdDelete} from 'react-icons/md'
import moment from 'moment'
import {changingUserRole,getAllUsers,deleteUser} from '../api';
import {actionType} from '../context/reducer'


function DashboardUsers() {
  useEffect(()=>{
    if(!allUsers){
      getAllUsers().then((data)=>{
        dispatch({
          type:actionType.SET_ALL_USERS,
          allUsers:data.user
        })
      })
     }
  },[]);
  const [{allUsers},dispatch]=useStateValue();
  return (
    <div className='w-full p-4 flex items-center justify-center flex-col'>

      <div className='relative w-full py-12 min-h-[400px] overflow-x-scroll my-4 flex flex-col items-center justify-start p-4 border border-gray-300 rounded-md gap-3'>
      {/* to get total count of user */}
      <div className='absolute top-4 left-4'>
      <p className='text-sm font-semibold'>
        Count:<span className='text-xl  font-bold text-textColor'>{allUsers?.length}</span>
      </p>
      </div>

      {/* to show table data from user */}
      <div className='w-full min-w-[750px] flex items-center justify-between'>
        {/* table heading of user */}
        <p className='text-sm text-textColor font-semibold w-275 min-w-[160px] text-center'>Image</p>
        <p className='text-sm text-textColor font-semibold w-275 min-w-[160px] text-center'>Name</p>
        <p className='text-sm text-textColor font-semibold w-275 min-w-[160px] text-center'>Email</p>
        <p className='text-sm text-textColor font-semibold w-275 min-w-[160px] text-center'>Verified</p>
        <p className='text-sm text-textColor font-semibold w-275 min-w-[160px] text-center'>Created</p>
        <p className='text-sm text-textColor font-semibold w-275 min-w-[160px] text-center'>Role</p>

      </div>
      {/* user data shown with rendering dashboardUserCart */}
      {
        allUsers && (
          allUsers.map((data,index)=>
           <DashboardUserCard data={data} index={index}/>
          )
        )
      }
      </div>
    </div>
  )
}

export const DashboardUserCard=({data,index})=>{
 const [isUserRoleUpdated,setUserRoleUpdated]=useState(false);

  const [{user,allUsers},dispatch]=useStateValue();
  const createdAt=moment(new Date(data.createdAt)).format('MMMM Do YYYY');

// update user role funciton
  const updateUserRole=(userId,role)=>{
    setUserRoleUpdated(false);
   changingUserRole(userId,role).then((res)=>{
    if(res){
     getAllUsers().then((data)=>{
      dispatch({
        type:actionType.SET_ALL_USERS,
        allUsers:data.user
      })
     })
    }
   })
  }

  //delete user

  const deleteOneUser=(userId)=>{
    deleteUser(userId).then((res)=>{
    if(res){
        getAllUsers().then((data)=>{
          dispatch({
            type:actionType.SET_ALL_USERS,
            allUsers:data.user
          })
        })
       }
    })
  }


  return(
    <motion.div key={index}
    className='relative w-full rounded-md flex items-center justify-between py-4 bg-lightOverlay cursor-pointer hover:bg-card hover:shadow-md'>
      {/* To delete the user */}
      {data._id!==user.user._id &&(
    <motion.div whileTap={{scale:0.75}}  className='absolute left-4 w-8 -h-8 rounded-md flex items-center justify-center bg-gray-200' onClick={()=>deleteOneUser(data._id)}>
     <MdDelete className='text-xl text-red-400 hover:text-red-500'/>
    </motion.div>
      )}
      {/* User image show */}
      <div className='w-275 min-w-[160px] flex items-center justify-center'>
      <img src={data.imageURL} referrerPolicy='no-referrer' alt="" className='w-10 h-10 object-cover rounded-md min-w-[40px] shadow-md'/>
      </div>
    
    {/* user name */}
    <p className='text-base text-textColor w-275 min-w-[160px] text-center'>{data.name}</p>
    {/* user email */}
    <p className='text-base text-textColor w-275 min-w-[160px] text-center'>{data.email}</p>
    {/* user verified or not */}
    <p className='text-base text-textColor w-275 min-w-[160px] text-center'>{data.email_verified?"True":"False"}</p>
    {/* user createdAt time */}
    <p className='text-base text-textColor w-275 min-w-[160px] text-center'>{createdAt}</p>
    {/* user role admin or member */}
    <div className='w-275 min-w-[160px] text-center flex items-center justify-center gap-1 relative'>
    <p className='text-base text-textColor w-275 min-w-[160px] text-center'>{data.role}</p>
    {
      data._id!==user.user._id && (
        <motion.p whileTap={{scale:0.75}} className='text-[10px] font-semibold text-textColor px-1 bg-purple-200 rounded-sm hover:shadow-md' onClick={()=>setUserRoleUpdated(true)}>
      Change Role
    </motion.p>
      )
    }
{/* To update the user to either admin or member */}
   {
   isUserRoleUpdated && (
  <motion.div
  initial={{opacity:0,scale:0.5}}
  animate={{opacity:1,scale:1}}
  exit={{opacity:1,scale:0.5}}
  className='absolute z-10 top-6 right-4 p-4 flex items-start flex-col gap-4 bg-white shadow-xl rounded-md'>
  <p className='text-textColor text-[12px] font-semibold'>
  Change User to <span>{data.role==='admin'?"Member":"Admin"}</span>?
  </p>
  <div className='flex items-center gap-4'>
    <motion.button whileTap={{scale:0.55}} className='outline-none border-none text-sm px-4 py-1 rounded-md bg-blue-200 text-black hover:shadow-md' onClick={()=>updateUserRole(data._id,data.role==='admin'?"member":"admin")}>Yes</motion.button>
    <motion.button whileTap={{scale:0.55}} className='outline-none border-none text-sm px-4 py-1 rounded-md bg-gray-200 text-black hover:shadow-md' onClick={()=>setUserRoleUpdated(false)}>No</motion.button>
  </div>
</motion.div>
   )
   }
    </div>
    </motion.div>
  )
}

export default DashboardUsers
