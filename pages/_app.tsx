import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { Toaster } from "react-hot-toast";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import SocketProvider from "@/lib/Socket/SocketProvider";

const queryClient = new QueryClient();
export default function App({ Component, pageProps }: any) {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <SocketProvider>
          <Component {...pageProps} />
          <Toaster />
        </SocketProvider>
      </QueryClientProvider>
    </>
  );
}
