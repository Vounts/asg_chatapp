import React from "react";
import { Oval } from "react-loader-spinner";
export default function Loading() {
  return (
    <div
      className="flex items-center justify-center mt-20
    "
    >
      <Oval color="black" secondaryColor="gray" width={30} strokeWidth={3} />
    </div>
  );
}
