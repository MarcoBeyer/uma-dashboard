"use client";
import { useQuery, gql } from "@apollo/client";
import Link from "next/link";
import { parseTitle } from "@/helpers/getVoteMetadata";
import { toUtf8String } from "ethers";

export default function Home() {
  const { loading, error, data } = useQuery(
    gql`
      {
        globals(first: 1) {
          userAddresses
        }
        priceRequests(first: 100, orderBy: time, orderDirection: desc) {
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
    <div className="flex flex-col min-h-screen py-2">
      <h1 className="text-4xl font-bold self-center">UMA Voting</h1>
      <h2 className="text-2xl font-bold self-center">Votes</h2>
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            <th className="py-3 px-6 text-left">Title</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {data.priceRequests.map((item: any) => (
            <tr key={item.id}>
              <td className="py-4 px-6">
                <Link href={`/votes/${item.id}/details`}>
                  {parseTitle(toUtf8String(item.ancillaryData))}
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
