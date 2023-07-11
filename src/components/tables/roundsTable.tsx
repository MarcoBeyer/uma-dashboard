import { round } from "lodash-es";

export const RoundsTable = (props: { data: any }) => {
  return (
    <table className="divide-y divide-gray-200 dark:divide-black">
      <thead>
        <tr>
          <th className="py-3 px-6 text-left">Voters</th>
          <th className="py-3 px-6 text-left">Correct Votes</th>
          <th className="py-3 px-6 text-left">Wrong Votes</th>
          <th className="py-3 px-6 text-left">Not Voted</th>
          <th className="py-3 px-6 text-left">Participation by Stake</th>
          <th className="py-3 px-6 text-left">Participation by Users</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200 dark:divide-black">
        {props.data.priceRequest?.rounds.map((element: any) => (
          <tr key={element.id}>
            <td className="py-4 px-6">{element.votersAmount}</td>
            <td className="py-4 px-6">{element.countCorrectVotes}</td>
            <td className="py-4 px-6">{element.countWrongVotes}</td>
            <td className="py-4 px-6">{element.countNoVotes}</td>
            <td className="py-4 px-6">
              {props.data.priceRequest.isResolved
                ? round(
                    element.totalVotesRevealed / element.cumulativeStakeAtRound,
                    2
                  )
                : "-"}
            </td>
            <td className="py-4 px-6">
              {props.data.priceRequest.isResolved
                ? round(
                    element.votersAmount /
                      (Number(element.votersAmount) +
                        Number(element.countNoVotes)),
                    2
                  )
                : "-"}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
