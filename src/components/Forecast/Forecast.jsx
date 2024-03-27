import React, { useState, useEffect } from "react";
import { DateTime } from "luxon";
import { API_KEY, BASE_URL } from "../../services/weather.service.js";
import rain from './icons/wind.svg';
import icon from './icons/Sun.svg';
import weather from './icons/weather.svg';
import wind from './icons/wind.svg';
import './Forecast.css';
import { IoIosArrowDropleft, IoIosArrowDropright } from "react-icons/io";

const Forecast = ({ city }) => {
  const [weatherForecast, setWeatherForecast] = useState(null);
  const [currentDayIndex, setCurrentDayIndex] = useState(0);
  const iconUrl = weatherForecast && weatherForecast.list ? `https://openweathermap.org/img/wn/${weatherForecast.list[currentDayIndex].weather[0].icon}@2x.png` : null;

  useEffect(() => {
    const fetchWeatherForecast = async () => {
      try {
        const response = await getWeatherForecast(city);
        setWeatherForecast(response);
      } catch (error) {
        console.error("Error fetching weather forecast:", error);
      }
    };

    fetchWeatherForecast();
  }, [city]);

  const getWeatherForecast = async (cityName) => {
    try {
      const url = `${BASE_URL}/forecast`;
      const queryParams = new URLSearchParams({
        q: cityName,
        appid: API_KEY,
        units: "metric",
        rain: "true",
        uvi: "true"
      });

      const response = await fetch(`${url}?${queryParams}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch weather forecast for ${cityName}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching weather forecast:", error);
      throw error;
    }
  };

  const formatDate = (timestamp) => {
    return DateTime.fromSeconds(timestamp).toFormat("DDDD");
  };

  const groupForecastByDay = (forecastList) => {
    const currentDate = DateTime.now().startOf('day');
    const groupedForecast = {};

    forecastList.forEach((forecast) => {
      const forecastDate = DateTime.fromSeconds(forecast.dt).startOf('day');
      const dateDiff = forecastDate.diff(currentDate, 'days').toObject().days;

      if (dateDiff >= 1 && dateDiff < 6) {
        const date = formatDate(forecast.dt);
        if (!groupedForecast[date]) {
          groupedForecast[date] = [];
        }
        groupedForecast[date].push(forecast);
      }
    });

    return groupedForecast;
  };

  const handlePrevDay = () => {
    setCurrentDayIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  const handleNextDay = () => {
    setCurrentDayIndex((prevIndex) => Math.min(prevIndex + 1, Object.keys(groupForecastByDay(weatherForecast.list)).length - 1));
  };

  return (
      <div>
        {weatherForecast && weatherForecast.list && (
            <div className={'days'}>
              <div className={'arrows'}>
                <IoIosArrowDropleft onClick={handlePrevDay}/>
                <img src={iconUrl} alt="" className="" width={40} height={40}/>
                <IoIosArrowDropright onClick={handleNextDay}/>
              </div>
              <div className={'weather_forecast'} key={weatherForecast.list[currentDayIndex].dt}>
                <p>{formatDate(weatherForecast.list[currentDayIndex].dt)}</p>
                <p> <img src={weather} width={25} height={25}/>Real Feel: {weatherForecast.list[currentDayIndex].main.feels_like}&deg;C</p>
                <p> <img src={wind} width={25} height={25}/>Wind: {weatherForecast.list[currentDayIndex].wind.speed} m/s</p>
                <p> <img src={rain} width={25} height={25}/>Chance of Rain: {weatherForecast.list[currentDayIndex].pop}%</p>
                <p> <img src={icon} width={25} height={25}/>UV Index: {weatherForecast.list[currentDayIndex].uvi}4</p>
              </div>
            </div>
        )}
      </div>
  );
};

export default Forecast;
