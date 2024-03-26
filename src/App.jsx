// App.jsx
import React, { useEffect, useState } from "react";
import getFormattedWeatherData from "./services/weather.service";
import MainInformation from "./components/MainInformation/MainIformation.jsx";
import MoreInfo from "./components/MoreInfo/MoreInfo";
function App() {
  const [query, setQuery] = useState({ q: "osh" });
  const [units, setUnits] = useState("metric");
  const [weather, setWeather] = useState(null);
  const [cityInput, setCityInput] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (query.q) {
      fetchWeatherData();
    }
  }, [query]);

  const fetchWeatherData = async () => {
    try {
      setLoading(true);
      const data = await getFormattedWeatherData({ ...query, ...units });
      setWeather(data);
    } catch (error) {
      console.error("Ошибка при получении данных о погоде:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    if (cityInput.trim() !== "") {
      setQuery({ q: cityInput });
      setCityInput("");
    }
  };

  const handleInputChange = (e) => {
    setCityInput(e.target.value);
  };

  return (
      <div className="container">
        <div className="search-container" style={{display:"flex",justifyContent:"center",alignItems:'center',gap:"20px",flexDirection:'column'}}>
          <input
              type="text"
              placeholder="Search City"
              value={cityInput}
              onChange={handleInputChange}
              style={{backgroundColor:'transparent',outline:'none', border:'none',borderBottom:'1px solid black',borderRadius:'26px',width:'280px',height:'40px'}}
          />
          <button onClick={handleSearch} style={{backgroundColor:"transparent",borderRadius:'20px',color:"white",width:'150px',height:'30px'}}>Поиск</button>
        </div>
        {loading ? (
            <div>Загрузка...</div>
        ) : weather ? (
            <div>
              <MainInformation weather={weather} />
              <MoreInfo name={query.q} />
            </div>
        ) : (
            <div>Ничего нет</div>
        )}
      </div>
  );
}

export default App;
