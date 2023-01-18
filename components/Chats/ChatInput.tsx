import React, {
  useState,
  useContext,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import cuid from "cuid";
import SendMessage from "./SendMessage";
import { useRouter } from "next/router";

export default function ChatInput({
  setMessages,
  Messages,
  userId,
  socket,
  toUser,
}: any) {
  const router = useRouter();
  const [Message, setMessage] = useState("");

  const updateStatus = (targetId: string, updatedList: any) => {
    let updatedMessages = updatedList?.map((r: any) => {
      if (r?.id == targetId) {
        return { ...r, sent: true };
      } else {
        return r;
      }
    });

    console.log(updatedMessages);

    setMessages(updatedMessages);
  };

  const SendChat = (e: any) => {
    e.preventDefault();
    if (Message == "") {
      return;
    }
    let sent;

    let messageId = cuid();

    //dupe
    let updatedList = [
      ...Messages,
      {
        id: messageId,
        userId: userId,
        message: Message,
      },
    ];

    if (router?.query?.chats) {
      sent = SendMessage(Message, String(router?.query?.chats)); //send our message
    }
    sent?.then((res) => {
      if (res.status == 200) {
        updateStatus(messageId, updatedList);

        //only emit if done
        //we emit the message
        socket.emit("createdMessage", {
          content: {
            id: messageId,
            userId: userId,
            message: Message,
          },
          from: userId,
          to: toUser,
        });
      }
    });

    setMessage("");

    setMessages((prev: any) => [
      ...prev,
      {
        id: messageId,
        userId: userId,
        message: Message,
      },
    ]);
  };

  return (
    <div className="mt-auto">
      <form onSubmit={(e) => SendChat(e)}>
        <input
          type={`text`}
          onChange={(e) => setMessage(e.target.value)}
          value={Message}
          placeholder={`Aa`}
          className="w-full bg-gray-100 rounded-sm py-2 px-4 outline-0 focus:ring-2 focus:ring-gray-400"
        />
        <input type={`submit`} placeholder={`Aa`} className="hidden" />
      </form>
    </div>
  );
}
