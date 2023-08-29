import React from "react";
import "./Hero.scss";

const Hero = (data) => {
  // console.log(data.data);
  return (
    <>
      <h1>{data.data.title}</h1>
    </>
  );
};

export default Hero;
