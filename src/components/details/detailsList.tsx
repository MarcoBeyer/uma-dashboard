export const DetailsList = (props: { children: React.ReactNode }) => {
  return (
    <dl className="grid gap-y-2 gap-x-6 grid-cols-2 max-w-fit text-sm md:text-base">
      {props.children}
    </dl>
  );
};
