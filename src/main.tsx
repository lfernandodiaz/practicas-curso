import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import MyComponent from "./MyComponent.tsx";
import { NavigationComponent as Navbar } from "./Navigation/NavigationComponent.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Navbar></Navbar>
    <App />
    <MyComponent text="Hola Mundo" />
    <MyComponent text="Hola" />
    <MyComponent text="Hola Mundo" />
    <MyComponent text="Hola" />
  </React.StrictMode>
);
