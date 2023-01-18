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
import { InferGetServerSidePropsType } from "next";
import { withSession, validateSession } from "@/lib/Auth/authentication";
import { useRouter } from "next/router";
const inter = Inter({ subsets: ["latin"] });

export default function Register(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  const router = useRouter();
  const [isLoading, setisLoading] = useState(false);
  const [User, setUser] = useState({
    username: "",
    password: "",
  });

  const Submit = (e: any) => {
    e.preventDefault();
    apost("/api/auth/register", User, setisLoading, null);
    setTimeout(() => {
      router.push("/login");
    }, 1500);
  };

  return (
    <GuestLayout>
      <Card className={`ml-auto mr-auto mt-auto mb-auto !p-12`}>
        <form
          onSubmit={(e) => Submit(e)}
          className="flex flex-col items-center justify-center gap-2"
        >
          <h1 className="flex items-center gap-4 text-[2rem]">
            <SiChatbot />
            My Chat App
          </h1>
          <h1>Login</h1>
          {Object.keys(User).map((key) => (
            <div key={key} className="flex flex-col">
              <label htmlFor={key}>{key.toUpperCase()}</label>
              <input
                type={key == "password" ? "password" : "text"}
                id={key}
                name={key}
                required
                onChange={(e) => {
                  const { name, value } = e.target;
                  setUser((prev) => ({
                    ...prev,
                    [name]: value,
                  }));
                }}
                className="input"
              />
            </div>
          ))}
          <Button isLoading={isLoading} className={`!bg-orange-300`}>
            Register
          </Button>
          <Link href={`/login`} className="underline">
            Back to login
          </Link>
        </form>
      </Card>
    </GuestLayout>
  );
}

export const getServerSideProps = withSession(validateSession);
