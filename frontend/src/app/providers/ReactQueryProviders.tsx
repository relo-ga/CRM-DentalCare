'use client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode } from 'react';
import { Provider } from "react-redux";
import { store } from "@/store/store";

const queryClient = new QueryClient();

type Props = {
  children: ReactNode;
};

export function ReactQueryProvider({ children }: Props) {
  return (
    <Provider store={store}>
        <QueryClientProvider client={queryClient}>
        {children}
        </QueryClientProvider>
    </Provider>
  );
}
