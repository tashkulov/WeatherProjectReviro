import "./MainIformation.css";
import { formatToLocalTime, kelvinToCelsius } from "../../services/weather.service";
import { FaLocationDot } from "react-icons/fa6";
import { MdNavigateNext } from "react-icons/md";
import { FaChevronDown } from "react-icons/fa";

const MainInformation = ({
                           weather: { dt, name, details, temp, timezone, icon },
                         }) => {
  // Формируем URL для иконки погоды на основе кода погоды
  const iconUrlFromCode = (code) => {
    return `https://openweathermap.org/img/wn/${code}@2x.png`;
  };

  return (
      <div>
        <div className="main_info desktop">
          <div className="written_info">
          <span className="city_name">
            <FaLocationDot />
            {name}
            <MdNavigateNext />
          </span>
            <span className="weather_detail">{details}</span>
            <span className="temperature_info">{kelvinToCelsius(temp)}°C</span>
            <p className="local_time">{formatToLocalTime(dt, timezone)}</p>
          </div>
          <div className="image_info">
            <img src={iconUrlFromCode(icon)} alt="" />
          </div>
        </div>
        <div className="main_weather_image"></div>
        <div className="main_info mobile">
          <div className="written_info">
            <div className="city_name">
              <div className="city">
                <FaLocationDot />
                {name}
                <FaChevronDown />
              </div>
              <div>User</div>
            </div>
            <span className="weather_detail">{details}</span>
            <div className="image_info">
              <img src={iconUrlFromCode(icon)} alt="" />
            </div>
            <span className="temperature_info">{kelvinToCelsius(temp)}°C</span>
            <p className="local_time">{formatToLocalTime(dt, timezone)}</p>
          </div>
        </div>
      </div>
  );
};

export default MainInformation;