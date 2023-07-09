"use client";

import { toUtf8String } from "ethers";
import { useQuery, gql } from "@apollo/client";
import { parseDescription, parseTitle } from "@/helpers/getVoteMetadata";
import { RoundsTable } from "@/components/tables/roundsTable";

export default function Page({ params }: { params: { id: string } }) {
  const { loading, error, data } = useQuery(
    gql`
      query {
        globals(first: 1) {
          cumulativeStake
        }
        priceRequest(
          id: "${decodeURIComponent(params.id)}"
        ) {
          id
          ancillaryData
          isResolved
          time
          price
          resolutionBlock
          rounds {
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
    <div className="flex flex-col min-h-screen py-2">
      <h1 className="text-4xl font-bold self-center">UMA Voting</h1>
      <h2 className="text-2xl font-bold self-center">Voting Results</h2>
      <h3 className="text-xl font-bold mt-2">
        {parseTitle(toUtf8String(data.priceRequest?.ancillaryData))}
      </h3>
      Description: <br />
      {parseDescription(toUtf8String(data.priceRequest?.ancillaryData))}
      <RoundsTable data={data} />
    </div>
  );
}
