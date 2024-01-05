import { round } from "lodash-es";
import { DataTable } from "./table";
import { Column } from "./tableColumn";

export const RoundsTable = (props: { data: any; className?: string }) => {
  return (
    <DataTable
      data={props.data.priceRequest.rounds}
      dataKey="id"
      className={props.className}
    >
      <Column field="votersAmount" header="Voters" />
      <Column field="countCorrectVotes" header="Correct Votes" />
      <Column field="countWrongVotes" header="Wrong Votes" />
      <Column field="countNoVotes" header="Not Voted" />
      <Column
        field="participationByStakeSize"
        header="Participation by stake size"
        body={(rowData) => {
          return rowData.totalVotesRevealed && rowData.cumulativeStakeAtRound
            ? round(
                rowData.totalVotesRevealed / rowData.cumulativeStakeAtRound,
                2
              )
            : "-";
        }}
      />
      <Column
        field="participationByIndividualUsers"
        header="Participation by individual users"
        body={(rowData) =>
          rowData.totalVotesRevealed &&
          Number(rowData.countNoVotes) &&
          Number(rowData.votersAmount)
            ? round(
                rowData.votersAmount /
                  (Number(rowData.votersAmount) + Number(rowData.countNoVotes)),
                2
              )
            : "-"
        }
      />
      <Column
        field="participationByIndividualStakers"
        header="Participation by individual stakers"
        body={(rowData) =>
          rowData.totalVotesRevealed && props.data.users
            ? round(rowData.votersAmount / props.data.users.length, 2)
            : "-"
        }
      />
    </DataTable>
  );
};
