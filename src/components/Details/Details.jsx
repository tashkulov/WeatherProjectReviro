import React, { useEffect, useState } from "react";
import line from  './icons/Line.svg'
import {getFormattedWeatherData} from '../../services/weather.service.js'
import './Details.css'
const WeatherPeriod = ({ period }) => {
    const { title, temp, icon } = period;
    const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;

    return (
        <div className="weather-period">
            <div className={'content'}>
                <div className="time">{title}</div>
                <div className="temperature">{temp}°C</div>

            </div>


            <img src={iconUrl} alt="Weather Icon" className="weather-icon" width={40} height={40}/>

        </div>
    );
};
const Details = ({city}) => {
    const [weatherData, setWeatherData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getFormattedWeatherData({ q: city });
                setWeatherData(data);
            } catch (error) {
                console.error("Error fetching weather data:", error);
            }
        };

        fetchData();
    }, [city]);

    return (
        <div className="details">
            {weatherData && (
                <div className="weather-periods">
                    {weatherData.hourly.map((period, index) => (
                        <WeatherPeriod key={index} period={period}/>
                    ))}
                </div>

            )}
            <img src={line} className={'line'} alt={''}/>

        </div>
    );
};


export default Details;
