import React from "react";
import logo from "../assets/logo.png";

export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-white z-50">
      <img src={logo} alt="Logo" className="h-16 w-16 animate-pulse mb-4" />
      
    </div>
  );
}
