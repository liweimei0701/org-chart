import React from "react";
import "./PersonCard.css";

const PersonCard = ({ personName, position, image, className }) => {
  return (
    <div className={className}>
      <div className='image_box'>
        <img src={image} alt="" />
      </div>
      <div>
        <div className='person_name'>{personName}</div>
        <div className='position'>{position}</div>
      </div>
    </div>
  );
};
export default PersonCard;
