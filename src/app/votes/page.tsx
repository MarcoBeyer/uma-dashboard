import { VoterTable } from "@/components/tables/voterTable";
import { getVotes } from "@/lib/graphql";

export const dynamic = "force-dynamic";

export default async function Home() {
  try {
    const data = await getVotes();

    return (
      <div className="py-2">
        <h1 className="text-2xl font-bold text-center">Voting Results</h1>
        <VoterTable data={data} />
      </div>
    );
  } catch (error) {
    return (
      <div className="py-2">
        <h1 className="text-2xl font-bold text-center text-red-500">
          Error Loading Data
        </h1>
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
