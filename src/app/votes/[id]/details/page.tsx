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
}
