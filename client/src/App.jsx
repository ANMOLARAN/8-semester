
import './App.css'
import React, {useEffect,useState} from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom'
import { ChatMessage, ContactUs, Dashboard, Home, Login, MusicPlayer, Premium, UserProfile} from './component'

import {app} from './config/firebase.config'
import {browserSessionPersistence, getAuth, setPersistence, signInWithEmailAndPassword} from 'firebase/auth';

import {AnimatePresence,motion} from "framer-motion";
import { validateUser } from './api'

import { useStateValue } from './context/stateProvider'
import { actionType } from './context/reducer'


function App() {
  const firebaseAuth=getAuth(app);
  const navigate=useNavigate();

  const [{user,isSongPlaying},dispatch]=useStateValue();

  const [auth,setAuth]=useState(false || window.localStorage.getItem('auth')===true);

  useEffect(()=>{


  firebaseAuth.onAuthStateChanged((userCred)=>{
    if(userCred){
      userCred.getIdToken().then((token)=>{
        // console.log(userCred);
         console.log(token);
        validateUser(token).then((data)=>{
          dispatch({
            type:actionType.SET_USER,
            user:data,
          });
        })
      })
    }else{
      window.localStorage.setItem('auth','false');
      dispatch({
        type:actionType.SET_USER,
        user:null,
      });
      navigate('/login')
    }
  })


 
  },[])
  return (
    <AnimatePresence mode="wait">
    <div className="h-auto min-w-[680px] flex justify-center items-center">
     <Routes>
      <Route path='/login' element={<Login setAuth={setAuth}/>} />
      <Route path='/*' element={<Home/>} />
      <Route path='/dashboard/*' element={<Dashboard/>}/>
      <Route path='/userProfile' element={<UserProfile/>}/>
      <Route path='/chat' element={<ChatMessage/>}/>
      <Route path='/contact' element={<ContactUs/>}/>
      <Route path='/premium' element={<Premium/>}/>
     </Routes>

     
     {isSongPlaying && (
      <motion.div
      initial={{opacity:0,y:50}}
      animate={{opacity:1,y:0}}
      className='fixed min-w-[700px] inset-x-0 bottom-0 bg-cardOverlay drop-shadow-2xl backdrop-blur-md flex items-center justify-center'>
      <MusicPlayer/>
      </motion.div>
     )}
    </div>
    </AnimatePresence>
  )
}

export default App
