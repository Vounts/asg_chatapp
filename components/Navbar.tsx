import Link from "next/link";
import React, { useState } from "react";
import { BsChatFill } from "react-icons/bs";
import { FaUserPlus, FaUserFriends } from "react-icons/fa";
import Button from "./Button";
import { IoExit } from "react-icons/io5";
import { useRouter } from "next/router";

const routes: { [key: string]: any } = {
  "/": <FaUserFriends />,

  "/chats": <BsChatFill />,
};

export default function Navbar() {
  const router = useRouter();

  return (
    <nav className="flex border-r border-gray-200 min-h-screen bg-white">
      <ul className="flex flex-col text-[1.2rem] ">
        {Object.keys(routes).map((route) => (
          <Link
            href={route}
            key={route}
            className={`icon m-2 ${
              route == `/${router.pathname.split("/")[1]}` &&
              "bg-gray-200 rounded-md"
            } `}
          >
            {routes[route]}
          </Link>
        ))}
        <IoExit className="mx-6 mt-auto mb-14 hover:opacity-80 cursor-pointer" />
      </ul>
    </nav>
  );
}
