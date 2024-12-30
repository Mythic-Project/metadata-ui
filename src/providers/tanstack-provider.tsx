import { ReactNode, useState } from "react";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import React from "react";

export default function TanstackProvider({children} : {children: ReactNode}) {
    const [client] = useState(new QueryClient())

    return (
      <QueryClientProvider client={client}>
        {children}
      </QueryClientProvider>
    )
}