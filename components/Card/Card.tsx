import React from "react";

export default function Card({ children, className }: any) {
  return (
    <div
      className={`flex flex-col shadow-md rounded-md p-4 bg-white ${className}`}
    >
      {children}
    </div>
  );
}
