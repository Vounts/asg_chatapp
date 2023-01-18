import React from "react";
import Navbar from "@/components/Navbar";
import Card from "@/components/Card/Card";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
export default function AuthedLayout({ children, props }: any) {
  const router = useRouter();
  const { isLoading, error, data, isFetching, refetch } = useQuery(
    ["contacts", router],
    () =>
      axios
        .post("/api/query/contacts", {})
        .then((res) => res.data)
        .catch((err) => console.log(err))
  );

  console.log(data);

  return (
    <div className="flex flex-min-h-screen">
      <div className="flex flex-row w-full">
        <Navbar />
        <Card>
          <h1>My Contacts</h1>
          {data &&
            data?.length > 0 &&
            data?.map((convo: any) => (
              <div
                className={`min-w-[300px] p-4 border-b-2 hover:bg-gray-100 cursor-pointer ${
                  router.query.chats == convo?.id && "bg-gray-200"
                }`}
                key={convo?.id}
                onClick={() => router.push(`/chats/${convo?.id}`)}
              >
                {
                  convo?.usersConversations?.filter(
                    (el: any) => el?.userId != props?.user?.id
                  )[0]?.user?.username
                }
              </div>
            ))}
        </Card>
        {children}
      </div>
    </div>
  );
}
