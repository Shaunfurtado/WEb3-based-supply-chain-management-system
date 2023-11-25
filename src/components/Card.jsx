import React from "react";

const Card = ({ title, description, buttonText }) => (
  <div className="card w-96 bg-primary text-primary-content">
    <div className="card-body">
      <h2 className="card-title">{title}</h2>
      <p>{description}</p>
      <div className="card-actions justify-end">
        <button className="btn">{buttonText}</button>
      </div>
    </div>
  </div>
);

export default Card;
