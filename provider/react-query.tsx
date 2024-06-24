"use client"

import { QueryClient, QueryClientProvider } from 'react-query'

const queryClient = new QueryClient();

export default function ReactQuery({ children }: { children: any }) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  )
}
