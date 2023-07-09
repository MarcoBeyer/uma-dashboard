import { parseTitle } from "@/helpers/getVoteMetadata";
import { toUtf8String } from "ethers";
import Link from "next/link";

export const VoterTable = (props: { data: any }) => {
  return (
    <>
      <table className="min-w-full divide-y divide-gray-200 self-start">
        <thead>
          <tr>
            <th className="py-3 px-6 text-left">Title</th>
            <th className="py-3 px-6 text-left">Time</th>
            <th className="py-3 px-6 text-left">Result</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {props.data.priceRequests.map((item: any) => (
            <tr key={item.id}>
              <td className="py-4 px-6">
                <Link href={`/votes/${item.id}/details`}>
                  {parseTitle(toUtf8String(item.ancillaryData)).slice(0, 100)}
                </Link>
              </td>
              <td className="py-4 px-6">
                {new Date(item.time * 1000).toISOString()}
              </td>
              <td className="py-4 px-6">{item.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
      Total Votes: {props.data.priceRequests.length}
    </>
  );
};
