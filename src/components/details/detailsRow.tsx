//row props for details page
//

export type DetailsRowProps = {
  title: string;
  value: string | number;
};

export const DetailsRow = (props: DetailsRowProps) => {
  return (
    <>
      <dt>{props.title}</dt>
      <dd>{props.value}</dd>
    </>
  );
};
