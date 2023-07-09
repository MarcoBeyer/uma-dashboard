"use client";

import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";

export default function Providers({ children }: { children: React.ReactNode }) {
  const client = new ApolloClient({
    uri: "https://api.thegraph.com/subgraphs/name/umaprotocol/mainnet-voting-v2",
    cache: new InMemoryCache(),
  });
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
