import React, { useEffect, useState } from 'react'
import { getAllMessage } from '../api'
import '../styles/AllMessage.css'

function AllMessages({name}) {
  console.log("allmessage",name)
    const [allMessage,setAllMessage]=useState(null);
    useEffect(()=>{
        getAllMessage().then((res)=>{
            setAllMessage(res.chat)
        })
    })
  return (
    <div className='allMessage'>
       {allMessage && allMessage.map((data)=>(
        <div className={`${data.name==name?'oneMessage_same_name':'oneMessage_different_name'}`}>
          {/* name of user */}
        <h6 className={`${data.name==name?'allMessage_same_name':'allMessage_different_name'}`}>{data.name}</h6>
        {/* message fo user */}
        <h3 className={`${data.name==name?'allMessage_same_message':'allMessage_different_message'}`}>{data.message}</h3>
        </div>
      ))}
    </div>
  )
}

export default AllMessages
