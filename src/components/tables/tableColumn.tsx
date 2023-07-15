export const Column = (props: {
  field: string;
  header: string;
  body?: (rowData: any) => React.ReactNode;
}) => {
  return <th className="py-3 px-6 text-left">{props.header}</th>;
};
