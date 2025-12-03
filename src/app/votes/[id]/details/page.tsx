import { toUtf8String } from "ethers";
import { parseDescription, parseTitle } from "@/helpers/getVoteMetadata";
import { RoundsTable } from "@/components/tables/roundsTable";
import { getVoteDetails, getUsersAtBlock } from "@/lib/graphql";

export const dynamic = "force-dynamic";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  try {
    const { id } = await params;
    const data = await getVoteDetails(decodeURIComponent(id));
    const usersRound = await getUsersAtBlock(data.priceRequest.resolutionBlock);

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
  } catch (error) {
    return (
      <div className="min-h-screen py-2">
        <h2 className="text-2xl font-bold text-center text-red-500">
          Error Loading Data
        </h2>
        <div className="m-3 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
          <p className="text-red-700 dark:text-red-300">
            Unable to fetch data from The Graph API. The indexers may be
            temporarily unavailable.
          </p>
          <p className="text-sm text-red-600 dark:text-red-400 mt-2">
            {error instanceof Error ? error.message : "Unknown error"}
          </p>
        </div>
      </div>
    );
  }
}
