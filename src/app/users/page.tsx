import { round } from "lodash-es";
import { UsersTable } from "@/components/tables/usersTable";
import { DetailsList } from "@/components/details/detailsList";
import { DetailsRow } from "@/components/details/detailsRow";
import { getUsers } from "@/lib/graphql";

export const dynamic = "force-dynamic";

export default async function Page() {
  try {
    const data = await getUsers();

    return (
      <div className="min-h-screen py-2">
        <h1 className="text-2xl font-bold text-center">Users</h1>
        <div className="m-3">
          <DetailsList>
            <DetailsRow
              title="Cummulative stake"
              value={round(data.globals[0].cumulativeStake, 2)}
            />
            <DetailsRow
              title="Average stake"
              value={round(
                data.globals[0].cumulativeStake / data.users.length,
                2
              )}
            />
            <DetailsRow
              title="Total Users"
              value={data.globals[0].userAddresses.length}
            />
            <DetailsRow
              title="Total Users with Stake"
              value={data.users.length}
            />
          </DetailsList>
        </div>
        <UsersTable data={data} />
      </div>
    );
  } catch (error) {
    return (
      <div className="min-h-screen py-2">
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
