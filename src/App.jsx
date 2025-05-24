import { useState, useEffect } from "react";
import "./App.css";
import Time from "./componens/time";
import FlipDate from "./componens/FlipDate";
import Namaztime from "./componens/Namaztime";

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

function App() {
  const [loading, setLoading] = useState(false);
  const [weatherData, setWeatherData] = useState(null);
  const [namazTime, setNamazTime] = useState(null);
  const [date, setDate] = useState(null);
  const [error, setError] = useState(null);
  const [nextNamaz, setNextNamaz] = useState(null);

  console.log("Hijri date in state: ", date);
  console.log("Namaz time in state: ", namazTime);
  console.log("Weather data in state: ", weatherData);

  const fetchWeatherByCoords = async (lat, lon) => {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    );
    if (!response.ok) {
      throw new Error("Location weather not available");
    }
    const data = await response.json();
    return data;
  };

  const fetchNamazTime = async (lat, lon) => {
    const response = await fetch(
      `https://api.aladhan.com/v1/timings?latitude=${lat}&longitude=${lon}&method=1&school=1`
    );
    if (!response.ok) {
      throw new Error("Namaz time not available");
    }
    const data = await response.json();
    return data;
  };

  useEffect(() => {
    // Get user's location weather on initial load
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        try {
          setLoading(true);
          const { latitude, longitude } = position.coords;
          const data = await fetchWeatherByCoords(latitude, longitude);
          setWeatherData(data);
          const fetchedData = await fetchNamazTime(latitude, longitude);
          setNamazTime(fetchedData.data.timings);
          setDate(fetchedData.data.date);
          console.log("api's data fetched: ", fetchedData.data);
        } catch (err) {
          setError(
            "Failed to get your location weather. Try searching for a city."
          );
        } finally {
          setLoading(false);
        }
      });
    }
  }, []);

  const getCurrentAndNextNamaz = (namazzTime) => {
    if (!namazzTime) return null;

    const now = new Date();
    const currentMinutes = now.getHours() * 60 + now.getMinutes();

    const namazList = [
      { name: "Fajr", time: namazzTime.Fajr },
      { name: "Dhuhr", time: namazzTime.Dhuhr },
      { name: "Asr", time: namazzTime.Asr },
      { name: "Maghrib", time: namazzTime.Maghrib },
      { name: "Isha", time: namazzTime.Isha },
    ];

    for (let i = 0; i < namazList.length; i++) {
      const [h, m] = namazList[i].time.split(":").map(Number);
      const namazMinutes = h * 60 + m;

      if (currentMinutes < namazMinutes) {
        // We're between namazList[i - 1] and namazList[i]
        const current =
          i === 0 ? namazList[namazList.length - 1] : namazList[i - 1];
        const next = namazList[i];
        return [current, next];
      }
    }

    // If time is after Isha, current is Isha and next is Fajr (next day)
    return [
      namazList[namazList.length - 1], // Isha
      namazList[0], // Fajr
    ];
  };

  useEffect(() => {
    if (!namazTime) return;

    const updateCurrentAndNextNamaz = () => {
      const result = getCurrentAndNextNamaz(namazTime);
      setNextNamaz(result);
    };

    updateCurrentAndNextNamaz(); // Initial
    const interval = setInterval(updateCurrentAndNextNamaz, 60000); // Every minute

    return () => clearInterval(interval);
  }, [namazTime]);

  return (
    <>
      <div className="rounded-2xl max-w-full md:w-200  bg-gray-900   mx-auto p-3 ">
        <h2 className="text-2xl text-center font-bold text-green-400 mb-4">
          Welcome To Namaz Timings
        </h2>
        <div className="hidden md:flex justify-between items-center mb-4 ">
          <div className="w-1/4 overflow-hidden rounded-xl h-50">
            <img
              className="w-full h-full object-cover"
              src="./madina.jpg"
              alt="madina"
            />
          </div>
          <div className="w-2/4 h-50 overflow-hidden rounded-xl">
            <img
              className="w-full h-full object-cover"
              src="./kalma-1.png"
              alt="kalma"
            />
          </div>
          <div className="w-1/4 h-50  overflow-hidden rounded-xl">
            <img
              className="w-full h-full object-cover"
              src="./kabba.jpg"
              alt="kabba"
            />
          </div>
        </div>

        <div className=" flex flex-col md:flex-row  md:justify-between md:items-center mb-4 gap-4">
          <div className="md:w-2/3">
            <div className="flex justify-center items-center gap-2 p-2">
              <div className="w-1/2 h-30 border-2 border-blue-400 overflow-hidden rounded-xl text-green-600 font-bold text-center p-2">
                {nextNamaz && (
                  <div className="flex flex-col items-center justify-center">
                    <p className="text-2xl text-green-500">
                      Start {nextNamaz[0].time}
                    </p>
                    <p className="text-[#00BFFF]">{nextNamaz[0].name}</p>
                    <p className="text-2xl text-[#FF3C3C]">
                      End {nextNamaz[1].time}
                    </p>
                  </div>
                )}
              </div>
              <div className="w-1/2 h-30 text-4xl rounded-xl border-2 border-amber-700 text-green-600 font-bold text-center p-2">
                <Time />
                <div className="flex items-center gap-1 justify-center mt-2">
                  {date?.gregorian?.weekday?.en && (
                    <p className="text-lg md:text-3xl">{date.gregorian.weekday.en}</p>
                  )}
                  {weatherData?.main?.temp !== undefined && (
                    <p className="text-lg md:text-2xl">
                      {Math.round(weatherData.main.temp)}°C
                    </p>
                  )}
                </div>
              </div>
            </div>
            <div className="flex justify-center items-center gap-2 p-2">
              <div className="w-1/2 h-30 p-2 flex justify-center rounded-xl border-2 border-amber-400">
                <img
                  className="object-contain  h-25 w-25 "
                  src="./1620690073الله.svg"
                  alt="Allah"
                />
              </div>
              <div className="w-1/2 h-30 p-2 flex justify-center  rounded-xl border-2 border-blue-400">
                <img
                  className="object-cover h-30 w-55 "
                  src="./kalma-1.png"
                  alt="madina"
                />
              </div>
            </div>
            <div className="flex justify-center items-center gap-2 p-2">
              <div className="w-1/2 h-30 p-2 flex justify-center items-center  rounded-xl border-2 border-blue-400">
                {date ? (
                  <FlipDate date={date} namazTime={namazTime} />
                ) : (
                  <p className="text-gray-500">Loading Hijri date…</p>
                )}
              </div>
              <div className="w-1/2 h-30 p-2 text-4xl  rounded-xl border-2 border-amber-400">
                {nextNamaz && nextNamaz[1] && (
                  <div className="flex flex-col items-center justify-center">
                    <p className="text-[50px] text-[#FF4500]">
                      {nextNamaz[1].time}
                    </p>
                    <p className="text-[#00CFFF]">{nextNamaz[1].name}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="md:w-1/3">
            <Namaztime namazTime={namazTime} />
          </div>
        </div>
        <footer className="w-full mt-4 py-4 border-t-[1px] text-center text-gray-300 text-sm">
        © {new Date().getFullYear()} Namaz Timings Board. Made with{" "}
        <span className="text-green-400">React</span> &amp;{" "}
        <span className="text-blue-400">Tailwind CSS</span>.
        <br />
        Developed by{" "}
        <span className="text-green-400 font-semibold">Shahid R</span>
      </footer>
      </div>
      
    </>
  );
}

export default App;
