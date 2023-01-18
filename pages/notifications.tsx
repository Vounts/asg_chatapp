import React, {
  useState,
  useContext,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import { withSession } from "@/lib/Auth/authentication";
import AuthedLayout from "./layout/AuthedLayout";
import { validateLoggedSession } from "@/lib/Auth/authentication";
import Card from "@/components/Card/Card";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { CgTrash } from "react-icons/cg";
import apost from "@/lib/Axios/axios";
const NotificationCard = ({ n, refetch }: any) => {
  return (
    <div className="border-b border-gray-200 p-4 flex w-full">
      {n?.message}{" "}
      <span
        className="ml-auto text-red-400 cursor-pointer hover:opacity-80"
        onClick={(e) => {
          apost(
            "/api/notifications/deleteNotification",
            { id: n?.id },
            () => {},
            null
          );
          setTimeout(() => {
            refetch();
          }, 1000);
        }}
      >
        X
      </span>
    </div>
  );
};

export default function Notifications(props: any) {
  const { isLoading, error, data, isFetching, refetch } = useQuery(
    ["notifications"],
    () =>
      axios
        .post("/api/notifications/getNotifications", {})
        .then((res) => res.data)
        .catch((err) => console.log(err))
  );

  let isRead = data?.filter((x: any) => x.read == false);

  useEffect(() => {
    if (isRead?.length > 0) {
      axios.post("/api/notifications/updateNotification", {}).then((res) => {
        console.log(res);
        refetch();
      });
    }
  }, []);

  return (
    <AuthedLayout props={props}>
      <Card className={`w-full`}>
        <h1 className="text-[1.4rem]">Notifications</h1>
        {data && data?.length > 0 ? (
          data?.map((n: any, i: number) => (
            <NotificationCard key={n?.id} n={n} />
          ))
        ) : (
          <span>No notifications found!</span>
        )}
      </Card>
    </AuthedLayout>
  );
}

export const getServerSideProps = withSession(validateLoggedSession);
