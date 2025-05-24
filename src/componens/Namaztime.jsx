
const Namaztime = ({namazTime}) => {
    const adjustTime = (timeStr, offsetMin = 0) => {
  const [hours, minutes] = timeStr.split(":").map(Number);
  const date = new Date();
  date.setHours(hours);
  date.setMinutes(minutes + offsetMin);
  return date.toTimeString().slice(0, 5); // returns HH:MM
};


  return (
    <div>
       {namazTime && (
              <div className="p-2 border-2 text-center border-green-600 rounded-xl flex flex-col gap-2 text-sm uppercase text-white h-full">
                {/* Header Row (optional) */}
                <div className="flex">
                  <span className="flex-1 font-bold text-base text-left text-gray-300">English</span>
                  <span className="flex-1 font-bold text-base text-gray-300">Time</span>
                  <span className="flex-1 font-bold text-base text-gray-300">اردو</span>
                </div>
                <div className="flex items-center">
                  <span className="flex-1 text-left  text-[#00BFFF]">Fajar</span>
                  <span className="flex-1 text-[#FF4500] text-xl">{adjustTime(namazTime.Fajr)}</span>
                  <span className="flex-1 text-[#00BFFF] ">فجر</span>
                </div>
                <div className="flex items-center">
                  <span className="flex-1 text-left text-[#00BFFF]">Dhuhr</span>
                  <span className="flex-1 text-[#FF3C3C] text-xl">{adjustTime(namazTime.Dhuhr)}</span>
                  <span className="flex-1 text-[#00BFFF]">ظہر</span>
                </div>
                <div className="flex items-center">
                  <span className="flex-1 text-left text-[#00BFFF]">Asr</span>
                  <span className="flex-1 text-[#FF3C3C] text-xl" >{adjustTime(namazTime.Asr)}</span>
                  <span className="flex-1 text-[#00BFFF]">عصر</span>
                </div>
                <div className="flex items-center">
                  <span className="flex-1  text-left text-[#00BFFF]">Maghrib</span>
                  <span className="flex-1  text-[#FF3C3C] text-xl">{namazTime.Maghrib}</span>
                  <span className="flex-1  text-[#00BFFF]">مغرب</span>
                </div>
                <div className="flex items-center">
                  <span className="flex-1 text-left text-[#00BFFF]">Isha</span>
                  <span className="flex-1 text-[#FF3C3C] text-xl">{adjustTime(namazTime.Isha)}</span>
                  <span className="flex-1 text-[#00BFFF]">عشاء</span>
                </div>
                <div className="flex items-center">
                  <span className="flex-1 text-left">Jum'ah</span>
                  <span className="flex-1 text-xl">13:30</span>
                  <span className="flex-1">جمعہ</span>
                </div>
                <div className="flex items-center">
                  <span className="flex-1 text-left text-[#FF4500]">TULU</span>
                  <span className="flex-1 text-xl text-[#FF3C3C]">{namazTime.Sunrise}</span>
                  <span className="flex-1 text-[#FF4500]">طلوع</span>
                </div>
                <div className="flex items-center">
                  <span className="flex-1  text-left text-[#FF4500]">Zawal</span>
                  <span className="flex-1 text-xl text-[#FF3C3C]">{namazTime.Dhuhr}</span>
                  <span className="flex-1 text-[#FF4500]">زوال</span>
                </div>
                <div className="flex items-center">
                  <span className="flex-1 text-left text-[#FF4500]">Gurub</span>
                  <span className="flex-1 text-xl text-[#FF3C3C]">{namazTime.Sunset}</span>
                  <span className="flex-1 text-[#FF4500]">غروب</span>
                </div>
                <div className="flex  items-center">
                  <span className="flex-1 text-left text-[#00BFFF]">TAHAJJUD</span>
                  <span className="flex-1 text-green-500 text-xl">{namazTime.Lastthird}</span>
                  <span className="flex-1 text-[#00BFFF]">تہجد</span>
                </div>
              </div>
            )}
    </div>
  )
}

export default Namaztime
