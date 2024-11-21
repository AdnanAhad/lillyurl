"use client";
import { useState } from "react";

export default function Home() {
  const [isVibrating, setIsVibrating] = useState(false);

  const [buttonText, setButtonText] = useState("Touch Me");

  const handleSubmit = async (longUrl) => {
    // e.preventDefault();
    setButtonText("Just a sec...");
    const res = await fetch("/api/shorten", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ originalUrl: longUrl }),
    });
    const data = await res.json();
    console.log("The short url is:", data);

    const shortUrl = `${window.location.origin}/${data.shortUrl}`;
    return shortUrl;
  };

  const handleCopy = (shortUrl) => {
    navigator.clipboard.writeText(shortUrl);
    // alert("Short URL copied to clipboard!");
  };

  const isValidUrl = (url) => {
    // Regex pattern to check for valid http or https URLs with domain
    const urlPattern = /^(https?:\/\/)([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}.*$/;
    return urlPattern.test(url);
  };

  const handleClickToPaste = async () => {
    setIsVibrating(false);
    const longUrl = await navigator.clipboard.readText();

    if (isValidUrl(longUrl)) {
      console.log("The URL is valid.");
    } else {
      setIsVibrating(true);
      setButtonText("OOPs...");
      return;
    }
    console.log("The URL you have pasted is:", longUrl);
    const shortUrl = await handleSubmit(longUrl);

    console.log("recieved Short URL is", shortUrl);

    handleCopy(shortUrl);

    setButtonText("Done :)");

    // handleError();
  };

  return (
    <div className="border border-red-600 h-screen w-screen flex justify-center items-center">
      <div className="h-34 w-34 bg-white text-white rounded-full flex justify-center items-center">
        <button
          type="submit"
          aria-label="Click here to to paste and copy lily Url"
          // className="h-32 w-32 bg-gray-600 text-white rounded-full shadow-md hover:shadow-lg active:scale-95 transition-all duration-200"
          className={`h-32 w-32 bg-gray-600 text-white rounded-full shadow-md hover:shadow-lg active:scale-95 transition-all duration-200 ${
            isVibrating ? "vibrate" : ""
          }`}
          onClick={handleClickToPaste}
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
}

/* {shortUrl && (
        <div className="mt-6">
          <p>
            Short URL:{" "}
            <span className="text-blue-600 underline">{shortUrl}</span>
          </p>
          <button
            onClick={handleCopy}
            className="mt-2 px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
          >
            Copy URL
          </button>
        </div>
      )} */
