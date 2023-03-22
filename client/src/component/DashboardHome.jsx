import React, { useEffect } from 'react'
import {  FaUsers } from 'react-icons/fa';
import { GiLoveSong, GiMusicalNotes } from 'react-icons/gi'
import { RiUserStarFill } from "react-icons/ri";
import { getAllUsers,getAllArtists,getAllSongs,getAllAlbums } from '../api';
import { actionType } from '../context/reducer';
import { useStateValue } from '../context/stateProvider'
import { bgColors } from '../utils/styles';

//Dashboard Card rendering
export const DashboardCard=({icon,name,count})=>{
  const bg_Color=bgColors[parseInt(Math.random()*bgColors.length)]
return (
  <div 
  style={{background:`${bg_Color}`}}
  className='p-4 w-40 gap-3 h-auto rounded-lg shadow-md flex flex-col items-center justify-center'>
   {icon}
   <p className='text-xl text-textColor font-semibold'>{name}</p>
   <p className='text-xl text-text'>{count}</p>
  </div>
)
}

function DashboardHome() {
  const [{allUsers,allSongs,allArtists,allAlbums},dispatch]=useStateValue();
  useEffect(()=>{
   if(!allUsers){
    getAllUsers().then((data)=>{
      dispatch({
        type:actionType.SET_ALL_USERS,
        allUsers:data.user
      })
    })
   }

   if(!allArtists){
    getAllArtists().then((data)=>{
      dispatch({
        type:actionType.SET_ALL_ARTISTS,
        allArtists:data.artist
      })
    })
   }

   if(!allSongs){
    getAllSongs().then((data)=>{
      dispatch({
        type:actionType.SET_ALL_SONGS,
        allSongs:data.song
      })
    })
   }
   
   if(!allAlbums){
    getAllAlbums().then((data)=>{
      dispatch({
        type:actionType.SET_ALL_ALBUMS,
        allAlbums:data.album
      })
    })
   }
  },[])
  return (
    <div className='w-full p-6 flex items-center justify-evenly flex-wrap'>
     <DashboardCard icon={<FaUsers className='text-3xl text-text'/> } name={'Users'} count={allUsers?.length>0?allUsers.length:0}/>
     <DashboardCard icon={<GiLoveSong className='text-3xl text-text'/> } name={'Songs'} count={allSongs?.length>0?allSongs.length:0}/>
     <DashboardCard icon={<RiUserStarFill className='text-3xl text-text'/> } name={'Artists'} count={allArtists?.length>0?allArtists.length:0}/>
     <DashboardCard icon={<GiMusicalNotes className='text-3xl text-text'/> } name={'Albums'} count={allAlbums?.length>0?allAlbums.length:0}/>
     
    </div>
  )
}

export default DashboardHome
