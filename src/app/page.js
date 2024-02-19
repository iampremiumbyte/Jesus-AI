'use client'

import { sendRequest } from '@/utils/openai';
import Image from 'next/image'
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react'


const HomePage = () => {

  return (
    <div className={"container"}>
      {/* overlay */}
      <div className='overlay'></div>
      <video src='/answer-bg.mp4' muted autoPlay loop />
      {/* navbar */}
      <nav>
        <div className='logo'>Jesus Ai</div>
      </nav>
      {/* main */}
      <div className='main'>
        <Link href={"/chat"} className='chat-button'>Enter God's Presence</Link>
      </div>
    </div>
  )
}

export default HomePage