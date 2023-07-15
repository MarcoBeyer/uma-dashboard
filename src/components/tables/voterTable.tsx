import { formatVoteString, parseTitle } from "@/helpers/getVoteMetadata";
import { toUtf8String } from "ethers";
import { round } from "lodash-es";
import Link from "next/link";

export const VoterTable = (props: { data: any }) => {
  return (
    <>
      <table className="divide-y divide-gray-200 dark:divide-gray-900 overflow-x-auto block">
        <thead>
          <tr>
            <th className="py-3 px-6 text-left">Title</th>
            <th className="py-3 px-6 text-left">Time</th>
            <th className="py-3 px-6 text-left">Result</th>
            <th className="py-3 px-6 text-left">Participation by stake size</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 dark:divide-black">
          {props.data.priceRequests.map((item: any) => (
            <tr key={item.id} className="text-ellipsis overflow-hidden">
              <td className="py-4 px-6 max-w-xl overflow-hidden whitespace-nowrap">
                <Link href={`/votes/${item.id}/details`}>
                  {parseTitle(toUtf8String(item.ancillaryData)).slice(0, 100)}
                </Link>
              </td>
              <td className="py-4 px-6 max-w-min overflow-hidden whitespace-nowrap">
                {new Date(item.time * 1000).toISOString()}
              </td>
              <td className="py-4 px-6 max-w-xs overflow-hidden whitespace-nowrap">
                {item.price
                  ? formatVoteString(item.price, item.identifier.id)
                  : "-"}
              </td>
              <td className="py-4 px-6">
                {item.isResolved
                  ? round(
                      item.latestRound.totalVotesRevealed /
                        item.latestRound.cumulativeStakeAtRound,
                      2
                    )
                  : "-"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      Total Votes: {props.data.priceRequests.length}
    </>
  );
};
