import React, {
  useState,
  useContext,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import Card from "../Card/Card";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import axios from "axios";
import Message from "./Message";
import ChatInput from "./ChatInput";
import initSocket from "@/lib/Socket/initSocket";
import { useSocket } from "@/lib/Socket/SocketProvider";
import cuid from "cuid";
export default function ChatContainer({ props, socket }: any) {
  const [Messages, setMessages] = useState<any>([]);
  const router = useRouter();

  const { isLoading, error, data, isFetching, refetch } = useQuery(
    ["contacts"],
    () =>
      axios
        .post("/api/chats/getConversation", { targetId: router.query.chats })
        .then((res) => res.data)
        .catch((err) => console.log(err))
  );

  const targetUsername = data?.usersConversations?.filter(
    (el: any) => el?.userId != props?.user?.id
  )[0]?.user?.username;

  const targetUserId = data?.usersConversations?.filter(
    (el: any) => el?.userId != props?.user?.id
  )[0]?.user?.id;

  useEffect(() => {
    if (data) {
      setMessages(data?.messages);
    }
  }, [data]);

  useEffect(() => {
    if (socket) {
      socket.on("newIncomingMessage", ({ content, from }: any) => {
        if (from == targetUserId) {
          setMessages((prev: any) => [
            ...prev,
            {
              id: content?.id,
              userId: content?.userId,
              message: content?.message,
            },
          ]);
        }
      });
    }
  }, [socket, targetUserId]);

  return (
    <Card className={`w-full h-full text-[0.9rem]`}>
      <div className="font-medium border-b border-gray-200 p-4">
        {targetUsername}
      </div>
      <div className="flex flex-col h-full p-4 overflow-y-scroll max-h-[84vh]">
        {data && Messages?.length > 0 ? (
          Messages?.map((m: any, i: number) => (
            <Message key={m?.id} m={m} userId={props?.user?.id} />
          ))
        ) : (
          <span className="mt-auto mr-auto ml-auto mb-16 text-[0.8rem]">
            To start a conversation please type your message
          </span>
        )}
      </div>
      <ChatInput
        setMessages={setMessages}
        Messages={Messages}
        userId={props?.user?.id}
        socket={socket}
        toUser={targetUserId}
      />
    </Card>
  );
}
