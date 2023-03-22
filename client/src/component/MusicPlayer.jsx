import React, { useEffect, useState } from 'react'
import { RiPlayFill, RiPlayListFill } from 'react-icons/ri';
import { useStateValue } from '../context/stateProvider';
import {motion} from 'framer-motion'
import AudioPlayer from 'react-h5-audio-player'
import 'react-h5-audio-player/lib/styles.css'
import { actionType } from '../context/reducer';
import { IoClose, IoMusicalNote } from 'react-icons/io5';


function MusicPlayer() {
    const [{allSongs,songIndex,isSongPlaying},dispatch]=useStateValue();
    const [isPlayList,setIsPlayList]=useState(false);

    const nextTrack=()=>{
     if(songIndex===allSongs.length-1){
      dispatch({
        type:actionType.SET_SONG_INDEX,
        songIndex:0
      })
     }
     else{
      dispatch({
        type:actionType.SET_SONG_INDEX,
        songIndex:songIndex+1
     })
    }
    }
    const previousTrack=()=>{
      if(songIndex===0){
        dispatch({
          type:actionType.SET_SONG_INDEX,
          songIndex:allSongs.length-1
        })
       }
       else{
        dispatch({
          type:actionType.SET_SONG_INDEX,
          songIndex:songIndex-1
       })
      }
      
    }
// to close the player
    const closePlayer=()=>{
      dispatch({
        type:actionType.SET_ISSONG_PLAYING,
        isSongPlaying:false
      })
    }
  return (
    <div className='w-full flex items-center gap-3'>
      <div className={`w-full items-center gap-3 p-4 flex relative`}>
        <img src={allSongs[songIndex]?.imageURL}
        className='w-40 h-20 object-cover rounded-md'
        />
        <div className='flex items-center flex-col'>
         <p  className='text-xl text-headingColor font-semibold'>
          {
            `${allSongs[songIndex]?.name.length>20?
              allSongs[songIndex]?.name.slice(0,20)
              :allSongs[songIndex]?.name
            }`
          }{" "}
          <span className='text-base'>({allSongs[songIndex]?.album})</span>
         </p>
         <p className='text-textColor'>
         {allSongs[songIndex]?.artist}{" "}
         <span className='text-sm text-textColor font-semibold'>{allSongs[songIndex]?.category}</span>
         </p>

         <motion.i
         className='cursor-pointer'
         whiteTap={{scale:0.75}}
         onClick={()=>setIsPlayList(!isPlayList)}
         >
         <RiPlayListFill className='text-textColor hover:text-headingColor text-3xl'/>
         </motion.i>
        </div>
        {/* audio player */}
        <div className='flex-1'>
        <AudioPlayer
        src={allSongs[songIndex].songURL}
        onPlay={()=>console.log("isPlaying")}
        autoPlay={true}
        showSkipControls={true}
        onClickNext={nextTrack}
        onClickPrevious={previousTrack}
  />
        </div>
        {
          isPlayList && (
            <PlayListCard/>
          )
        }
        <IoClose className='absolute top-4 right-2 cursor-pointer text-xl' onClick={closePlayer}/>
      </div>
    </div>
  )
}

export const PlayListCard=()=>{
  const [{allSongs,songIndex,isSongPlaying},dispatch]=useStateValue();
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

  const setCurrentPlaySong=(index)=>{
    if(!isSongPlaying){
      console.log("end context")
      dispatch({
        type:actionType.SET_ISSONG_PLAYING,
        isSongPlaying:true
      })
    }
   console.log("ram")
    if(songIndex!=index){
      dispatch({
        type:actionType.SET_SONG_INDEX,
        songIndex:index
      })
    }
  }
  return (
    <div className="absolute left-4 bottom-24 gap-2 py-2 w-350 max-w-[350px] h-510 max-h-[510px] flex flex-col overflow-y-scroll scrollbar-thin rounded-md shadow-md bg-primary">
      {allSongs.length > 0 ? (
        allSongs.map((music, index) => (
          <motion.div
            initial={{ opacity: 0, translateX: -50 }}
            animate={{ opacity: 1, translateX: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className={`group w-full p-4 hover:bg-card flex gap-3 items-center cursor-pointer 
            }`}
            onClick={() => setCurrentPlaySong(index)}
          >
            <IoMusicalNote className="text-textColor group-hover:text-headingColor text-2xl cursor-pointer" />

            <div className="flex items-start flex-col">
              <p className="text-lg text-headingColor font-semibold">
                {`${
                  music?.name.length > 20
                    ? music?.name.slice(0, 20)
                    : music?.name
                }`}{" "}
                <span className="text-base">({music?.album})</span>
              </p>
              <p className="text-textColor">
                {music?.artist}{" "}
                <span className="text-sm text-textColor font-semibold">
                  ({music?.category})
                </span>
              </p>
            </div>
          </motion.div>
        ))
      ) : (
        <></>
      )}
    </div>
  );
}

export default MusicPlayer
