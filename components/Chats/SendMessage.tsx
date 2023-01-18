import React from "react";
import axios from "axios";
export default function SendMessage(msg: string, convoId: string) {
  return axios.post("/api/sendMessage", {
    message: msg,
    convoId: convoId,
  });
}
