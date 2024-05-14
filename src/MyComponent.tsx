import React from "react";

interface MyComponentProps {
  text: string;
}

function MyComponent({ text }: MyComponentProps) {
  const texto = text;

  return (
    <>
      <p>{texto}</p>
    </>
  );
}

export default MyComponent;
