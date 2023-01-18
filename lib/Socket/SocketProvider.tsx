import React, {
  useState,
  useContext,
  useEffect,
  useCallback,
  useMemo,
} from "react";

import io from "socket.io-client";
export const SocketContext = React.createContext(null);

export function useSocket() {
  return useContext(SocketContext);
}

export default function SocketProvider({ children }: any) {
  const [socket, setSocket] = useState<any>(null);

  useEffect(() => {
    async function initSocket() {
      await fetch("/api/socket");

      setSocket(io());
    }

    initSocket();
  }, []);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
}
