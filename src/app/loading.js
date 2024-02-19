'use client'

import { sendRequest } from '@/utils/openai';
import Image from 'next/image'
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react'


const Loading = () => {

    return (
        <div className={"container"}>
            {/* overlay */}
            <div className='overlay'></div>
            <video src='/answer-bg.mp4' muted autoPlay loop />
        </div>
    )
}

export default Loading