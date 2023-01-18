import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "@/styles/Home.module.css";
import Card from "@/components/Card/Card";
import { SiChatbot } from "react-icons/si";
import Link from "next/link";
import Button from "@/components/Button";

import React, {
  useState,
  useContext,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import GuestLayout from "./layout/GuestLayout";
import apost from "@/lib/Axios/axios";
import { withSession } from "@/lib/Auth/authentication";
import { validateLoggedSession } from "@/lib/Auth/authentication";
import AuthedLayout from "./layout/AuthedLayout";
import { InferGetServerSidePropsType } from "next";
import { useQuery } from "@tanstack/react-query";
import chat from "@/assets/images/chat.png";
import axios from "axios";
import Contacts from "@/components/Contacts/Contacts";
const inter = Inter({ subsets: ["latin"] });

export default function Home(props: any) {
  return (
    <AuthedLayout props={props}>
      <div className="w-full flex flex-col items-center justify-center">
        <Image src={chat} alt={`chat`} />
        <span className="text-[2.7rem] max-w-[700px] text-center">
          Hi <span className="text-orange-300">{props?.user?.username}</span>{" "}
          Welcome to MyChat App
        </span>
      </div>
      <Contacts user={props?.user} />
    </AuthedLayout>
  );
}

export const getServerSideProps = withSession(validateLoggedSession);
