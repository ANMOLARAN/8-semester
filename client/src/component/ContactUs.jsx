import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';
import Header from './Header'
import '../styles/ContactUs.css'
import { BsInstagram, BsFacebook, BsTwitter } from "react-icons/bs";


function ContactUs() {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_rdjw6mq', 'template_d717avn', form.current, 'hEKlciuwMbea7yPcN')
      .then((result) => {
          console.log(result.text);
          alert("Message sent successfully")

      }, (error) => {
          console.log(error.text);
      });
  };
  return (
    <div className='w-full'>
        <Header/>
        <h1 className='text-2xl text-center my-4'>Contact Us</h1>
      <div className='border-red-900 bg-primary my-4 flex justify-center gap-12'>
      <div className='flex flex-col w-[40%]'>
        <h1  className='text-xl'>Have a question?</h1>
        <h2 className='text-lg'>Contact Us!</h2>
      <form ref={form} onSubmit={sendEmail}
      className='flex flex-col justify-center'>
        {/* for  name */}
      <label className='text-lg'>Name</label>
      <input className='outline-none p-1' type="text" name="user_name" />
      {/* for email */}
      <label className='text-lg'>Email</label>
      <input className='outline-none p-1' type="email" name="user_email" />
      {/* for messag */}
      <label className='text-lg'>Message</label>
      <textarea className='outline-none h-[110px] p-2' name="message"/><br></br>
      <input className='bg-purple-600 p-2 cursor-pointer hover:text-xl mb-2 rounded-md' type="submit" value="Send" />
    </form>
    </div>
    <div className='flex flex-col justify-center ml-12'>
      <p className='text-lg font-sans'>For any query, you can contact us in the given email or can message us.</p>
      <p className='text-lg font-sans'> We would love to solve your query</p>
      <h3 className='text-xl'>Contact</h3>
      <p><i>lookgeet@gmail.com</i></p>
      <h3 className='text-xl'>Based in</h3>
      <p>Morbi Road,Gujrat,Inida</p>
      <p>Marwadi University</p>
      {/* social  media accounts */}
      <div className='flex gap-6 text-2xl mt-3'>
      <BsInstagram/>
      <BsFacebook/>
      <BsTwitter/>
      </div>     
    </div>
    </div>
    </div>
  )
}

export default ContactUs







