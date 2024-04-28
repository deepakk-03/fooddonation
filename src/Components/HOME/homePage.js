import "react-toastify/dist/ReactToastify.css";
import HomeNavbar from "./homeNavbar";

import React, { useEffect, useState } from "react";
import Image1 from '../image/image1.jpg';
import Image2 from '../image/image2.jpg';
import Image3 from '../image/image3.jpg';
import Image4 from '../image/image4.jpg';

export default function HomePage() {
  const images = [Image1, Image2, Image3, Image4];
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 2000);
  
    return () => {
      clearInterval(intervalId); // Clean up the interval
    };
  }, [images.length]);
  

  return (
    <div>
      <HomeNavbar />
      <div className="py-5 md:py-0 container mx-auto px-6 flex items-center justify-between">
        <div aria-label="Home. logo" role="img">
          <div style={{ display: 'flex', flexDirection: 'column', height: '20vh' }}>
            <img
              style={{ width: '100%', height: '430%' }}
              src={images[currentIndex]}
              alt=""
            />

          </div>
        </div>
      </div>
    </div>
  );
}