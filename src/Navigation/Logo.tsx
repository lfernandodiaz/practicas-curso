import React from "react";

interface LogoProps {
  imageUrl: string;
}

function ImageComponent({ imageUrl }: LogoProps) {
  return (
    <>
      <img src={imageUrl} alt="Logo" />
    </>
  );
}

export default ImageComponent;
