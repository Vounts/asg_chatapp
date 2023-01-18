import React, {
  useState,
  useContext,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import Card from "../Card/Card";
import Button from "../Button";
import apost from "@/lib/Axios/axios";
import axios from "axios";
export default function Contacts({ user }: any) {
  const [isLoading, setisLoading] = useState(false);
  const [Username, setUsername] = useState("");
  const [Error, setError] = useState(null);

  const Submit = (e: any) => {
    e.preventDefault();
    apost(
      "/api/conversation/start",
      { username: user?.username, frienduser: Username },
      setisLoading,
      setError
    );

    axios.post("/api/notifications/createNotification", {
      from: user?.username,
      to: Username,
    });
  };

  return (
    <Card className={`w-full ml-auto max-w-[300px]`}>
      <span className="">Start by adding some contacts</span> <br></br>
      <form onSubmit={(e) => Submit(e)} className="flex flex-col gap-4">
        <label htmlFor="username">Friend&apos;s Username</label>
        <input
          onChange={(e) => setUsername(e.target.value)}
          required
          className="input"
        />
        <Button className={`m-auto`} isLoading={isLoading}>
          Add to Contact
        </Button>
      </form>
      {Error && (
        <span className="mt-4 text-red-400 text-[0.8rem]">{Error}</span>
      )}
    </Card>
  );
}
