"use client"
import { useState,useEffect } from "react";
import Head from 'next/head';
import Image from "next/image";
import CSPSSC from '@/public/CSPSC.webp';
export default function Home(){
  const [Input, setInput] = useState('');
  const [Output, setOutput] = useState(null);
  const [loading, setLoading] = useState(false);
    
  const revealUrl = async () => {
    if (!Input) return;  
    setLoading(true); 
    setOutput(null);

      const res = await fetch('/api', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ Input }),  
      });

      const data = await res.json();
        setOutput(data.Output);  
  };

  useEffect(() => {
    revealUrl();
  },[])
    return(
        <>
        <div className="bg-  ">
            <div className="flex justify-start  overflow-hidden">
            <Image src={CSPSSC} alt="checklist" className="mt-1 overflow-hidden w-1/4 " />
            <div 
            className="  w-3/4 flex flex-col justify-center "> 
            <h1 className="text-csps text-center text-5xl">Unshorten URLs </h1>
            </div>
            </div>
            <div className="bg-csps ">
            <p class="scroll-text" className="text-white bg-csps text-center" > Short URL Expander is a tool designed to protect adults from cyber scams by revealing the true destination of shortened URLs</p></div>

            <div className=" m-auto flex justify-around overflow-hidden w-[60%] h-8 mt-4 border border-csps rounded-lg ">
                <input className="w-full h-full p-2 text-black" type="text" placeholder="Enter your short URL"  value={Input}
        onChange={(e) => setInput(e.target.value)} />
                <button onClick={revealUrl} className="bg-csps text-white w-24 h-8">Search</button>
            </div>
            <div className="h-auto m-4 w-full p-4 text-black text-center border border-black">
  <div>
    <Image src={CSPSSC} alt="checklist" className="mt-1 overflow-hidden w-1/4" />
  </div>
      <div className="flex flex-col justify-between">
      {Output &&  <h1> Your Destination link is 👇</h1>}
  {Output && (
    <a className="cursor-pointer hover:text-blue-900 hover:underline text-lg" href={Output} target="_blank" rel="noopener noreferrer">
      {Output}
    </a>
  )}
  </div>
</div>
  </div>
        </>
    );

}