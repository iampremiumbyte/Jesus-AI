'use client'

import { sendRequest } from '@/utils/openai';
import Image from 'next/image'
import React, { useEffect, useRef, useState } from 'react'


const Chat = () => {
    const defaultResponse = "Hello, My Child. How May I Help You Today?";
    const nextMessage = "Is there anything else you want to share?"

    const [speaking, setSpeaking] = useState(false);
    const [loading, setLoading] = useState(false);
    const [request, setRequest] = useState("");
    const [voiceUrl, setVoiceUrl] = useState("");
    const [response, setResponse] = useState(defaultResponse);
    const theme = useRef();
    const voiceRef = useRef();


    const handlePrayer = async () => {
        try {
            setLoading(true);
            setRequest("");
            // send prayer
            setSpeaking(true);
            setResponse("")
            const { answer, voice } = await sendRequest(request);
            const blob = new Blob([voice], { type: 'audio/mpeg' });
            // Create a URL for the blob object
            const url = URL.createObjectURL(blob);
            const audioPlayer = new Audio(url);
            setResponse(answer);
            audioPlayer.play()
            audioPlayer.addEventListener("ended", () => {
                setSpeaking(false);
                setLoading(false);
                setResponse(nextMessage)
            })
        }
        catch (err) {
            console.log(err);
            alert("something went wrong");
        }
    }

    useEffect(() => {
        theme.current.volume = 0.1;
        theme.current.play();
    }, [])


    return (
        <div className={`container ${speaking && 'speaking'}`}>
            {/* overlay */}
            <div className='overlay' style={loading ? {
                opacity: 0.3
            } : {
                opacity: 0.6
            }}></div>
            <video src='/answer-bg.mp4' muted autoPlay loop />
            {/* navbar */}
            <nav>
                <div className='logo'>Jesus Ai</div>
                {/* <Image src={"/speaker-light.png"} width={40} height={40} alt='mute' /> */}
            </nav>
            {/* main */}
            <div className='main'>
                <h1>{response}</h1>
            </div>
            <div className='prompt-wrap'>
                <div className='prompt'>
                    <textarea placeholder='Chat with Jesus' value={request} onInput={(e) => setRequest(e.target.value)} />
                    {
                        loading
                            ? <Image src={"/loading.png"} alt='pray' width={50} height={50} />
                            : <Image src={"/pray.png"} alt='pray' width={50} height={50} onClick={handlePrayer} />
                    }
                </div>
            </div>
            <audio src='theme.mp3' ref={theme} loop />
            <audio ref={voiceRef} src={voiceUrl}>
            </audio>
        </div>
    )
}

export default Chat