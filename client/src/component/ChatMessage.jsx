import React, { useEffect, useState } from 'react'

import { getAllMessage, saveNewMessage } from '../api';
import AllMessages from './AllMessages';
import { useStateValue } from '../context/stateProvider';
import Header from "./Header";
function ChatMessage() {
  const [{user},dispatch]=useStateValue();
  const [message,setMessage]=useState("");
  const [userName,setUserName]=useState("");
  useEffect(()=>{
    setUserName(user?.user?.name)
  },[])
  
  const saveMessage=()=>{
    console.log("click send button")
    const data={
        name:userName,
        message:message
    }
    saveNewMessage(data).then((res)=>{
      console.log(res.chat,"hi");
      setMessage("");
    }
    )
  }

  return (
    <div className='chat'>
      <Header/>
      <AllMessages name={userName}/>
      <div className='chat_input'>
      <input 
      className='chatMessage'
      type="text" value={message} onChange={(e)=>setMessage(e.target.value)}/>
      <button className='buttonMessage' onClick={saveMessage}>Send</button>
    </div>
    </div>
  )
}

export default ChatMessage
