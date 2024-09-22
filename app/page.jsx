"use client";
import { useState } from "react";
import Head from "next/head";
import Image from "next/image";
import CSPSSC from "@/public/CSPSC.webp";

export default function Home() {
  const [Input, setInput] = useState("");
  const [Output, setOutput] = useState(null);
  const [Info, setInfo] = useState(null);
  const [loading, setLoading] = useState(false);

  const styles = {
    container: {
      width: "500px",
      height: "300px",
      overflow: "hidden",
      border: "1px solid #ccc",
    },
    iframe: {
      width: "100%",
      height: "100%",
      border: "none",
    },
  };

  const revealUrl = async () => {
    if (!Input) return;
    setLoading(true);
    setOutput(null);
    setInfo(null);

    try {
      const res = await fetch("/api", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ Input }),
      });

      if (!res.ok) {
        throw new Error("Failed to fetch data");
      }

      const data = await res.json();
      setOutput(data.Output);
      setInfo(data.ok);
    } catch (error) {
      console.error(error);
      setOutput("Error occurred while fetching the URL.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="bg-">
        <div className="flex justify-start overflow-hidden">
          <Image
            src={CSPSSC}
            alt="checklist"
            className="mt-1 overflow-hidden w-1/4"
          />
          <div className="w-3/4 flex flex-col justify-center">
            <h1 className="text-csps text-center text-5xl">Unshorten URLs</h1>
          </div>
        </div>
        <div className="bg-csps">
          <p className="scroll-text text-white bg-csps text-center">
            Short URL Expander is a tool designed to protect adults from cyber
            scams by revealing the true destination of shortened URLs
          </p>
        </div>

        <div className="m-auto flex justify-around overflow-hidden w-[60%] h-8 mt-4 border border-csps rounded-lg">
          <input
            className="w-full h-full p-2 text-black"
            type="text"
            placeholder="Enter your short URL"
            value={Input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button onClick={revealUrl} className="bg-csps text-white w-24 h-8">
            Search
          </button>
        </div>

        <div className="h-auto m-4 w-full p-8 text-black text-center">
          {loading && <p>Loading...</p>}

          {Output && (
            <div className="flex  border p-6 border-black flex-row justify-around">
              <div style={styles.container} className="align-center">
                <iframe src={Output} style={styles.iframe} title="Embedded Website" />
              </div>

              <div className="flex flex-col justify-between">
                <h1 className=" text-csps text-2xl">Your Destination link is 👇</h1>
                <a
                  className="cursor-pointer hover:text-blue-900 hover:underline text-lg"
                  href={Output}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {Output}
                </a>

                {/* <h1>Here&apos;s more info about the domain:</h1> */}
                {/* <h2>{Info}</h2> */}
              </div>
            </div>
          )}
        </div>
<div className=" p-8 m-5 border border-black bg-gray-200" style={{ fontFamily: 'Arial, sans-serif', lineHeight: 1.6 }}>
  <h1 className="text-2xl m-3">What are Phishing Links ? How people lose their hard earned money in few clicks</h1>
      <p className="text-lg">
        <strong style={{ color: 'red' }}>Phishing scams</strong> are a prevalent form of cybercrime where attackers trick individuals into revealing sensitive information like <span style={{ color: 'blue' }}>passwords</span> or <span style={{ color: 'blue' }}>credit card details</span> by posing as legitimate entities. These scams typically involve <strong>malicious links</strong> sent via <a href="https://en.wikipedia.org/wiki/Email" style={{ color: 'green', textDecoration: 'none' }}>email</a>, <a href="https://en.wikipedia.org/wiki/SMS" style={{ color: 'green', textDecoration: 'none' }}>text messages</a>, or <a href="https://en.wikipedia.org/wiki/Social_media" style={{ color: 'green', textDecoration: 'none' }}>social media</a>, directing victims to <strong style={{ color: 'red' }}>fraudulent websites</strong> that closely mimic trusted sites. Once on these fake sites, victims are asked to input personal information or download harmful software. According to the <a href="https://www.ic3.gov/Media/PDF/AnnualReport/2022_IC3Report.pdf" style={{ color: 'green', textDecoration: 'none' }}>FBI’s 2022 Internet Crime Report</a>, phishing accounted for over <span style={{ color: 'blue' }}>323,000 complaints</span> in the U.S., leading to losses of over <span style={{ color: 'blue' }}>$52 million</span>. Globally, phishing attacks, including <strong style={{ color: 'red' }}>spear-phishing</strong> and <strong style={{ color: 'red' }}>clone-phishing</strong>, have caused trillions in damages, targeting both individuals and organizations. One of the most famous phishing incidents involved the <a href="https://en.wikipedia.org/wiki/Podesta_emails" style={{ color: 'green', textDecoration: 'none' }}>2016 breach of John Podesta’s email</a>, which influenced the U.S. presidential election. In 2019, <a href="https://www.zdnet.com/article/toyota-subsidiary-loses-37-million-following-bec-scam/" style={{ color: 'green', textDecoration: 'none' }}>Toyota Boshoku Corporation</a> lost <span style={{ color: 'blue' }}>$37 million</span> to a phishing scam. To recognize phishing links, users should be wary of <strong>suspicious URLs</strong>, <span style={{ color: 'blue' }}>urgent language</span>, and <strong>unexpected attachments</strong>. Protecting against these scams involves verifying the source of communications, using <strong style={{ color: 'red' }}>two-factor authentication</strong>, keeping software updated, and educating oneself on the latest phishing tactics. Awareness and caution are essential to prevent falling victim to phishing, which continues to evolve in sophistication.
      </p>
    
      </div>
      </div>
    </>
  );
}