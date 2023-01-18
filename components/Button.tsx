import React from "react";
import { Oval } from "react-loader-spinner";
export default function Button({ children, className, isLoading }: any) {
  return (
    <button
      className={`button flex items-center justify-center rounded-md ${className}`}
    >
      {children}
      <Oval
        visible={isLoading}
        width={15}
        height={15}
        color="white"
        secondaryColor="black"
      />
    </button>
  );
}
