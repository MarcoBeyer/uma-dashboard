"use client";
import { useQuery, gql } from "@apollo/client";
import { VoterTable } from "@/components/tables/voterTable";

export default function Home() {
  const { loading, error, data } = useQuery(
    gql`
      {
        priceRequests(first: 1000, orderBy: time, orderDirection: desc) {
          id
          identifier {
            id
          }
          ancillaryData
          time
          price
          resolutionBlock
          isResolved
          latestRound {
            id
            votersAmount
            cumulativeStakeAtRound
            countWrongVotes
            countCorrectVotes
            countNoVotes
            totalVotesRevealed
          }
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
    <div className="flex flex-col py-2">
      <h1 className="text-2xl font-bold self-center">Voting Results</h1>
      <VoterTable data={data} />
    </div>
  );
}
