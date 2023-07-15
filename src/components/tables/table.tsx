import React from "react";

export const DataTable = (props: {
  children: React.ReactNode;
  data?: any[];
  dataKey: string;
  className?: string;
}) => {
  return (
    <table
      className={
        "divide-y divide-gray-200 dark:divide-black table-auto overflow-scroll" +
        props.className
          ? " " + props.className
          : ""
      }
    >
      <thead>
        <tr>{props.children}</tr>
      </thead>
      <tbody className="divide-y divide-gray-200 dark:divide-black">
        {props.data?.map((item: any) => (
          <tr key={item[props.dataKey]}>
            {React.Children.toArray(props.children).map((element: any) => (
              <td key={element.props.field} className="py-4 px-6">
                {element.props.body
                  ? element.props.body(item)
                  : item[element.props.field]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
