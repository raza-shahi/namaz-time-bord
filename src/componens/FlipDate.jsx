import React, { use } from 'react'
import { useState,useEffect } from "react";

const FlipDate = ({date,namazTime}) => {
  const [isFlipped, setIsFlipped] = useState(false);


 
    useEffect(() => {
      const interval = setInterval(() => {
        setIsFlipped((prev) => !prev);
      }, 3000);
      return () => clearInterval(interval);
    }, []);
 


  return (
    <div>
       {date && isFlipped? (
                  <div className="text-green-500 text-center w-full  font-bold">
                    <p className="text-2xl">{date.hijri.date}</p>
                    <p className='text-[#00CFFF]'>{date.hijri.month.en} </p>
                    <p className=" flex gap-2 justify-evenly text-2xl">
                      <span>IFTAR</span>
                      {namazTime.Sunset}{" "}
                    </p>
                  </div>
                ):
                (
                  <div className="text-[#FF3C3C] text-center w-full  font-bold">
                    <p className="text-2xl">{date.gregorian.date}</p>
                    <p className='text-[#00CFFF]'>{date.gregorian.month.en} </p>
                    <p className=" flex gap-2 justify-evenly text-2xl">
                      <span>SEHRI</span>
                      {namazTime.Imsak}{" "}
                    </p>
                  </div>
                )}
          
    </div>
  )
}

export default FlipDate
