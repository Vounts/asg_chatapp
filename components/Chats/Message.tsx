import React, {
  useState,
  useContext,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import { AiFillCheckCircle, AiOutlineCheckCircle } from "react-icons/ai";
import { useSocket } from "@/lib/Socket/SocketProvider";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
export const SenderMsg = ({ m, userId }: any) => {
  return (
    <div
      className={`${
        m?.userId == userId ? "ml-auto" : "mr-auto"
      } flex m-1 gap-1`}
    >
      <Tippy
        content={new Date(m.createdat).toLocaleString()}
        className="tooltip"
        placement="bottom"
      >
        <div
          id={`message`}
          className={`bg-lime-100 rounded-l-[2rem] rounded-tr-[1rem] p-4`}
        >
          {m.message}
        </div>
      </Tippy>

      <div className="mt-auto">
        {m?.sent ? <AiFillCheckCircle /> : <AiOutlineCheckCircle />}
      </div>
    </div>
  );
};

export const ReceiverMsg = ({ m, userId }: any) => {
  return (
    <div
      className={`${
        m?.userId == userId ? "ml-auto" : "mr-auto"
      } flex m-1 gap-1`}
    >
      <Tippy
        content={new Date(m.createdat).toLocaleString()}
        className="tooltip"
        placement="bottom"
      >
        <div className={`bg-gray-100 rounded-r-[2rem] rounded-tl-[1rem] p-4`}>
          {m.message}
        </div>
      </Tippy>
    </div>
  );
};

export default function Message({ m, userId }: any) {
  if (m?.userId == userId) {
    return <SenderMsg m={m} userId={userId} />;
  } else {
    return <ReceiverMsg m={m} userId={userId} />;
  }
}
