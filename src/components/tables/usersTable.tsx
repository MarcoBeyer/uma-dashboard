import { round } from "lodash-es";

export const UsersTable = (props: { data: any }) => {
  return (
    <>
      <table className="block overflow-x-auto">
        <thead className="[&_tr]:border-b">
          <tr className="border-b">
            <th className="h-10 px-4 text-left">Staker Adress</th>
            <th className="h-10 px-4 text-left">Relative Stake</th>
            <th className="h-10 px-4 text-left">Stake</th>
          </tr>
        </thead>
        <tbody>
          {props.data.users.map((item: any) => (
            <tr key={item.address}>
              <td className="p-4">{item.address}</td>
              <td className="p-4">
                {round(
                  (item.voterStake / props.data.globals[0].cumulativeStake) *
                    100,
                  4
                ) + "%"}
              </td>
              <td className="p-4">{item.voterStake}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};
