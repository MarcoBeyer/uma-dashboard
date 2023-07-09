//row props for details page
//

export type DetailsRowProps = {
  title: string;
  value: string;
};

export const DetailsRow = (props: DetailsRowProps) => {
  return (
    <div className="px-4 py-5 bg-gray-50 dark:bg-gray-800 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
      <dt className="text-sm font-medium text-gray-500">{props.title}</dt>
      <dd className="mt-1 text-sm text-gray-900 dark:text-gray-100 sm:mt-0 sm:col-span-2">
        {props.value}
      </dd>
    </div>
  );
};
