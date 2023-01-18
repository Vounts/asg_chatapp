import { NextApiResponse } from "next";
import React from "react";
import response from "../Http/Response";

export default function CatchError(func: Function) {
  try {
    func();
  } catch (e: any) {
    console.log(e);
  }
}
