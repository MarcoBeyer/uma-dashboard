import { round } from "lodash-es";

export const UsersTable = (props: { data: any }) => {
  return (
    <>
      <table className="divide-y divide-gray-200 dark:divide-black">
        <thead>
          <tr>
            <th className="py-3 px-6 text-left">Staker Adress</th>
            <th className="py-3 px-6 text-left">Relative Stake</th>
            <th className="py-3 px-6 text-left">Stake</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 dark:divide-black">
          {props.data.users.map((item: any) => (
            <tr key={item.address}>
              <td className="py-4 px-6">{item.address}</td>
              <td className="py-4 px-6">
                {round(
                  (item.voterStake / props.data.globals[0].cumulativeStake) *
                    100,
                  4
                ) + "%"}
              </td>
              <td className="py-4 px-6">{item.voterStake}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};
