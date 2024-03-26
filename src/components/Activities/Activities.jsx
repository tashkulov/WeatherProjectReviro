import React from "react";
import "./Activities.css";
import { FaHeart } from "react-icons/fa";

const Activities = () => {
  const mockData = [
    {
      id: 1,
      imageUrl:
        "https://img.freepik.com/premium-photo/photos-beautiful-forest-in-spring-with-bright-sun-shining-through-the-trees-photography_131346-3033.jpg",
      howFar: "2km away",
    },
    {
      id: 2,
      imageUrl:
        "https://tourinform.org.ua/wp-content/uploads/2023/10/278905505_2378040655679617_7479086136649757407_n.jpg",
      howFar: "1.5km away",
    },
    {
      id: 3,
      imageUrl:
        "https://patriotov.net/images/photos/articles/329/Tahiti-Beach-in-the-bay-of-Cala-Kotichcho.jpg",
      howFar: "3km away",
    },
    {
      id: 4,
      imageUrl:
        "https://s9.travelask.ru/system/images/files/001/276/193/wysiwyg_jpg/%D0%B0%D0%BB%D1%8C%D0%BF%D1%8B.jpg?1550655537",
      howFar: "500m away",
    },
  ];
  return (
    <div className="activities_main">
      <div className="activities_head">
        <FaHeart className="heart_icon" />
        <span className="activities_title">Activities in your area</span>
      </div>
      <div className="activities_items">
        {mockData.map((item) => {
          return (
            <div key={item.id} className="activity">
              <div className="activities_img">
                <img src={item.imageUrl} alt="" />
              </div>
              <div className="activities_distance">{item.howFar}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Activities;
