import { VoterTable } from "@/components/tables/voterTable";
import { getVotes } from "@/lib/graphql";

export const dynamic = "force-dynamic";

export default async function Home() {
  const data = await getVotes();

  return (
    <div className="py-2">
      <h1 className="text-2xl font-bold text-center">Voting Results</h1>
      <VoterTable data={data} />
    </div>
  );
}
