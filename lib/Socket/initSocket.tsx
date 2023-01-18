import React from "react";
import io from "socket.io-client";
export default async function initSocket(socket: any) {
  await fetch("/api/socket");

  socket = io();

  socket.on("newIncomingMessage", (msg: any) => {
    
    console.log("msg", msg);
  });
}
