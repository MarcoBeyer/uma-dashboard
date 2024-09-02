"use client";

import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";

export default function Providers({ children }: { children: React.ReactNode }) {
  const client = new ApolloClient({
    uri: "https://gateway.thegraph.com/api/4bcf57f90cb8716afbc611e709ed9760/subgraphs/id/5YVXjj28Lv4eLhHg54R1QWVHNn8VAjZnT3vJgEtuyWmY",
    cache: new InMemoryCache(),
  });
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
