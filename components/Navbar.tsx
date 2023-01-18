import Link from "next/link";
import React, { useState } from "react";
import { BsChatFill } from "react-icons/bs";
import { FaUserPlus, FaUserFriends } from "react-icons/fa";
import Button from "./Button";
import { IoExit } from "react-icons/io5";
import { useRouter } from "next/router";
import { AiFillBell } from "react-icons/ai";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
const routes: { [key: string]: any } = {
  "/": <FaUserFriends />,
  "/chats": <BsChatFill />,
  "/notifications": <AiFillBell />,
};

export default function Navbar({ first }: any) {
  const router = useRouter();

  const { isLoading, error, data, isFetching, refetch } = useQuery(
    ["notifications"],
    () =>
      axios
        .post("/api/notifications/getNotifications", {})
        .then((res) => res.data)
        .catch((err) => console.log(err))
  );

  let isRead = data?.filter((x: any) => x.read == false);
  return (
    <nav className="flex border-r border-gray-200 min-h-screen bg-white">
      <ul className="flex flex-col text-[1.2rem] ">
        {Object.keys(routes).map((route) => (
          <Link
            href={route === "/chats" ? `${first}` : route}
            key={route}
            className={`icon m-2 ${
              route == `/${router.pathname.split("/")[1]}` &&
              "bg-gray-200 rounded-md"
            } `}
          >
            {routes[route]}
          </Link>
        ))}
        <div className="bg-red-400 rounded-full max-w-[20px] max-h-[20px] text-[0.8rem] text-white text-center relative bottom-12 left-9">
          {isRead?.length > 0 && isRead?.length}
        </div>
        <IoExit
          onClick={() => {
            axios.post("/api/auth/logout").then((res) => {
              router.push("/login");
            });
          }}
          className="mx-6 mt-auto mb-14 hover:opacity-80 cursor-pointer"
        />
      </ul>
    </nav>
  );
}
