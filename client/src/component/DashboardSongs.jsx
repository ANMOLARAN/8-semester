import React, { useEffect, useState } from 'react'
import {NavLink} from "react-router-dom"
import {IoAdd,IoPause,IoTrash} from "react-icons/io5"
import {BsFileExcel} from 'react-icons/bs'
import { useStateValue } from '../context/stateProvider';
import { getAllSongs } from '../api';
import { actionType } from '../context/reducer';
import {SongCard} from '.';



function DashboardSongs() {
  const [songFilter,setSongFilter]=useState("");
  const [isFocus,setIsFocus]=useState(false);
  const [{allSongs},dispatch]=useStateValue();
  
  useEffect(()=>{
     if(!allSongs){
    getAllSongs().then((data)=>{
      dispatch({
        type:actionType.SET_ALL_SONGS,
        allSongs:data.song
      })
    })
   }
  },[])
  return (
    <div className='w-full p-4 flex items-center justify-center flex-col'>
     {/* Search box and + icon */}
      <div className='w-full flex justify-center items-center gap-20'>
        {/* plus icon */}
      <NavLink to={'/dashboard/newSong'} className='flex items-center justify-center px-4 py-3 border rounded-md border-gray-300 hover:border-gray-400 hover:shadow-md cursor:pointer'>
      <IoAdd/>
      </NavLink>
      {/* Search Box */}
      <input type='text'
      className={`w-52 px-4 py-2 border ${isFocus?'border-gray-500 shadow-md':'border-gray-300'} rounded-md bg-transparent outline-none duration-150 transition-all ease-in-out text-base text-textColor font-semibold `}
      placeholder='search Here....' value={songFilter} 
      onChange={(e)=>setSongFilter(e.target.value)}
      onBlur={()=>setIsFocus(false)}
      onFocus={()=>setIsFocus(true)}
      /> 
      <i className=''>
      <BsFileExcel className='text-3xl bg-gray-100 text-textColor cursor-pointer'/>
      </i>
      </div>
      {/* options Main Container */}
      <div className='relative w-full my-4 p-4 py-16 border border-gray-300 rounded-md'>
       {/* Count in  Songs */}
       <div className='absolute top-4 left-4'>
        <p className='text-xl font-bold'>
          <span className='text-sm font-semibold text-textColor'>Count:</span>
          {allSongs?.length>0?allSongs?.length:0}
          </p>
       </div>

       {/* song card */}
       <SongContainer data={allSongs}/>
      </div>
      
    </div>
  )
}

export const SongContainer=({data})=>{
return (
  <div className='w-full flex flex-wrap gap-3 items-center justify-evenly'>
     {data && data.map((song,i)=>(
      <SongCard key={song._id} data={song} index={i} type="song"/>
     )
     )
     }
  </div>
)
}
export default DashboardSongs
