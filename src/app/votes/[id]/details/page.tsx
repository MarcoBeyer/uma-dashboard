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

  const {
    loading: loadingUsers,
    error: errorUsers,
    data: usersRound,
  } = useQuery(
    gql`
      query {
        users(size: 1000, where: { voterStake_gt: 0 }, block: { number: ${data?.priceRequest.resolutionBlock} }) {
          id
        }
      }
    `,
    { skip: !data?.priceRequest.resolutionBlock }
  );

  if (loading || loadingUsers) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  if (errorUsers) {
    return <p>Error: {errorUsers.message}</p>;
  }

  return (
    <div className="min-h-screen py-2">
      <h2 className="text-2xl font-bold text-center">Voting Results</h2>
      <h3 className="text-xl font-bold mt-2">
        {parseTitle(toUtf8String(data.priceRequest?.ancillaryData))}
      </h3>
      <p className="text-ellipsis break-words">
        Description: <br />
        {parseDescription(toUtf8String(data.priceRequest?.ancillaryData))}
      </p>
      <RoundsTable
        data={{ ...data, ...usersRound }}
        className="overflow-x-auto block"
      />
    </div>
  );
}
