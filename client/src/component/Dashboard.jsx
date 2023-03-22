import React from 'react'
import { NavLink, Route, Routes } from 'react-router-dom'
import Header from './Header'
import {IoHome} from 'react-icons/io5'
import { isActiveStyles, isNotActiveStyles } from '../utils/styles'
import { Alert, DashboardAlbums, DashboardArtists, DashboardHome, DashBoardNewSong, DashboardSongs, DashboardUsers } from '.'
import { useStateValue } from '../context/stateProvider'

function Dashboard() {
  const [{alertType},dispatch]=useStateValue();
  return (
    <div className='w-full h-auto flex flex-col items-center justify-center bg-primary'>
    <Header/>
    <div className='w-[60%] p-4 flex items-center justify-evenly'>
    <NavLink to={'/dashboard/home'}><IoHome className={({isActive})=>isActive?isActiveStyles:isNotActiveStyles}/></NavLink>
    <NavLink to={'/dashboard/user'} className={({isActive})=>isActive?isActiveStyles:isNotActiveStyles}>Users</NavLink>
    <NavLink to={'/dashboard/songs'} className={({isActive})=>isActive?isActiveStyles:isNotActiveStyles}>Songs</NavLink>
    <NavLink to={'/dashboard/artists'} className={({isActive})=>isActive?isActiveStyles:isNotActiveStyles}>Artists</NavLink>
    <NavLink to={'/dashboard/albums'} className={({isActive})=>isActive?isActiveStyles:isNotActiveStyles}>Albums</NavLink>
    
    </div>

    <div className='my-4 w-full p-4'>
      <Routes>
        <Route path='/home' element={<DashboardHome/>}/>
        <Route path='/user' element={<DashboardUsers/>}/>
        <Route path='/songs' element={<DashboardSongs/>}/>
        <Route path='/artists' element={<DashboardArtists/>}/>
        <Route path='/albums' element={<DashboardAlbums/>}/>
        <Route path='/newSong' element={<DashBoardNewSong/>}/>
      </Routes>

    </div>
    {/* {alertType && (
       <Alert type={alertType} />
    )} */}
   
    </div>
  )
}

export default Dashboard
