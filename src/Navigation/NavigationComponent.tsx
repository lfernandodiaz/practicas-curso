import React, { useEffect, useState } from "react";
import { ElementComponent as E } from "./ElementComponent";
import ImageComponent from "./Logo";
import "./Navbar.css";
export function NavigationComponent() {
  const [urlAvatar, setUrlAvatar] = useState<string>("");
  const [userName, setUserName] = useState<string>("username");

  const getUserInfo = async () => {
    const response = await fetch("https://randomuser.me/api/").then(
      (response) => response.json()
    );
    const avatarUrl = response.results[0].picture.medium;
    const firstName = response.results[0].name.first;
    const lastName = response.results[0].name.last;
    setUrlAvatar(avatarUrl);
    setUserName(firstName + " " + lastName);
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <>
      <div className="navbar">
        <E label="About" url="/about" />
        <E label="Products" url="/products" />
        <E label="Category" url="/category" />
        <ImageComponent imageUrl={urlAvatar} />
        <p>{userName}</p>
      </div>
    </>
  );
}

export default NavigationComponent;
