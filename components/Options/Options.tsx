import React from "react";
import { CgTrash } from "react-icons/cg";
import apost from "@/lib/Axios/axios";
import { useRouter } from "next/router";
export default function Options({ close, refetch }: any) {
  const router = useRouter();
  return (
    <div className="border-b border-gray-400 p-4 flex gap-6">
      {`Options >`}{" "}
      <div
        onClick={(e) => {
          apost(
            "/api/contacts/deleteContact",
            {
              conversationId: router.query.chats,
            },
            () => {},
            null
          );

          setTimeout(() => {
            router.push("/");
            refetch();
          }, 1000);
        }}
        className=" flex items-center gap-2 hover:opacity-80 cursor-pointer"
      >
        <CgTrash className="text-[1.2rem] text-red-400" />
        Delete friend
      </div>
    </div>
  );
}
