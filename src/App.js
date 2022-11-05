import sunset from "./assets/sunset.jpg";
import Descriptions from "./components/Descriptions";
import { useEffect, useState } from "react";
import { getFormattedWeatherData } from "./weatherService";

const getFullDate = new Date();
const date = getFullDate.getDate();
const month = getFullDate.getMonth() + 1;
const year = getFullDate.getFullYear();
const day = getFullDate.getDay();
const time = getFullDate.getHours();
const minute = getFullDate.getMinutes();

function App() {
  const [city, setCity] = useState("delhi");
  const [weather, setWeather] = useState(null);
  const [units, setUnits] = useState("metric");
  const [bg, setBg] = useState(sunset);
  const [weekday, setWeekday] = useState('');

  useEffect(() => {
    const fetchWeatherData = async () => {
      const data = await getFormattedWeatherData(city, units);
      setWeather(data);

      // dynamic bg
      const threshold = units === "metric" ? 20 : 60;
      if (data.temp <= threshold) setBg(sunset);
      else setBg(sunset);
    };

    fetchWeatherData();
  }, [units, city]);

  useEffect(()=>{
    if(day===0){
      setWeekday("Sunday");
    }else if(day===1){
      setWeekday("Monday");
    }else if(day===2){
      setWeekday("Tuesday");
    }else if(day===3){
      setWeekday("Wednesday");
    }else if(day===4){
      setWeekday("Thursday");
    }else if(day===5){
      setWeekday("Friday");
    }else if(day===6){
      setWeekday("Saturday");
    }
  },[]);
  const handleUnitsClick = (e) => {
    const button = e.currentTarget;
    const currentUnit = button.innerText.slice(1);

    const isCelsius = currentUnit === "C";
    button.innerText = isCelsius ? "°F" : "°C";
    setUnits(isCelsius ? "metric" : "imperial");
  };

  const enterKeyPressed = (e) => {
    if (e.keyCode === 13) {
      setCity(e.currentTarget.value);
      e.currentTarget.blur();
    }
  };

  return (
    <div className="app" style={{ backgroundImage: `url(${bg})` }}>
      <div className="overlay">
        {weather && (
          <div className="container">
            <div className="section section__inputs">
              <input
                onKeyDown={enterKeyPressed}
                type="text"
                name="city"
                placeholder="Enter City..."
              />
              <button onClick={(e) => handleUnitsClick(e)}>°F</button>
            </div>

            <div className="section section__temperature">
              <div className="icon">
                <h3>{`${weather.name}, ${weather.country}`}</h3>
                <img src={weather.iconURL} alt="weatherIcon" />
                <h3>{weather.description}</h3>
              </div>
              <div className="date">
                <h1>{weekday}</h1>
                <h2 className="date">{`${date}/${month}/${year}`}</h2>
                <h1 className="time">{`${time}:${minute}`}</h1>
              </div>
              <div className="temperature">
                <h1>{`${weather.temp.toFixed()} °${
                  units === "metric" ? "C" : "F"
                }`}</h1>
              </div>
            </div>

            <Descriptions weather={weather} units={units} />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
