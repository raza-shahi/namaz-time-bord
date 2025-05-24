import React, { useEffect, useState } from "react";

const Time = () => {
  const [time, setTime] = useState(new Date());
  const [showColon, setShowColon] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
      setShowColon((prev) => !prev); // Toggle colon every second
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const hours = time.getHours().toString().padStart(2, "0");
  const minutes = time.getMinutes().toString().padStart(2, "0");

  return (
    <span className="text-[#00CFFF] text-[50px] font-bold">
      {hours}
      <span style={{ opacity: showColon ? 1 : 0, transition: "opacity 0.2s" }}>:</span>
      {minutes}
    </span>
  );
};

export default Time;