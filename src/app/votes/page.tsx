"use client";
import { useQuery, gql } from "@apollo/client";
import { VoterTable } from "@/components/tables/voterTable";

export default function Home() {
  const { loading, error, data } = useQuery(
    gql`
      {
        priceRequests(first: 1000, orderBy: time, orderDirection: desc) {
          id
          ancillaryData
          time
          price
          resolutionBlock
        }
      }
    `
  );

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div className="flex flex-col justify-center min-h-screen py-2">
      <h1 className="text-4xl font-bold self-center">UMA Voting</h1>
      <h2 className="text-2xl font-bold self-center">Voting Results</h2>
      <VoterTable data={data} />
    </div>
  );
}
