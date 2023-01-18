import React from "react";
import AuthedLayout from "pages/layout/AuthedLayout";
import { withSession } from "@/lib/Auth/authentication";
import { validateLoggedSession } from "@/lib/Auth/authentication";
import ChatContainer from "@/components/Chats/ChatContainer";
import { useSocket } from "@/lib/Socket/SocketProvider";
export default function Chats(props: any) {
  const socket = useSocket();

  return (
    <AuthedLayout props={props}>
      <ChatContainer props={props} socket={socket} />
    </AuthedLayout>
  );
}

export const getServerSideProps = withSession(validateLoggedSession);
