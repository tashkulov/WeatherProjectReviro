// MoreInfo.jsx
import React from "react";
import Menu from "../Menu/Menu";
import Activities from "../Activities/Activities";
import Forecast from "../Forecast/Forecast";
import Details from "../Details/Details";
import "./MoreInfo.css";

const MoreInfo = ({ name }) => {
    return (
        <div className="more_detailed_info">
            <Menu />
            <div className="activities_forecast">
                <Activities />
                {/* Передаем свойство name в компонент Details */}
                <Details className="details_air" city={name} />
            </div>
            <Forecast city={name} />
        </div>
    );
};

export default MoreInfo;
