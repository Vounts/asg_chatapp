const messageHandler = (io: any, socket: any) => {
  const createdMessage = ({ content, from, to }: any) => {
    socket.broadcast.emit("newIncomingMessage", {
      content: content,
      from: from,
  });
  };

  socket.on("createdMessage", createdMessage);
};

export default messageHandler;
