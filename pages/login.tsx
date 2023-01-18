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
import { withSession, validateSession } from "@/lib/Auth/authentication";
const inter = Inter({ subsets: ["latin"] });
import { useRouter } from "next/router";
import { InferGetServerSidePropsType } from "next";
import { toast } from "react-hot-toast";
import axios from "axios";
export default function Login(
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

    setisLoading(true);
    axios
      .post("/api/auth/login", User)
      .then((res) => {
        if (res.status == 200) {
          toast.success(res.data.message);
          router.push("/");
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((err: any) => {
        toast.error(err.response.data.message);
      })
      .finally(() => setisLoading(false));
  };

  console.log(User);

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
          <Button isLoading={isLoading}>Login</Button>
          <Link href={`/register`} className="underline">
            Join us now! Click here
          </Link>
        </form>
      </Card>
    </GuestLayout>
  );
}

export const getServerSideProps = withSession(validateSession);
