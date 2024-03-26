import React from "react";
import "./Menu.css";
import { FaChevronDown } from "react-icons/fa";
import { TiWeatherShower } from "react-icons/ti";
import { MdExplore } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import { MdSettings } from "react-icons/md";
import UserAvatar from "../UserAvatar/UserAvatar";
const Menu = () => {
  return (
    <div className="main_menu">
      <ul>
        <li>
          <UserAvatar />
        </li>
        <li>
          <TiWeatherShower />
          weather
        </li>
        <li>
          <MdExplore />
          explore
        </li>
        <li>
          <FaLocationDot />
          cities
        </li>
        <li>
          <MdSettings />
          settings
        </li>
      </ul>
    </div>
  );
};

export default Menu;
