export const DetailsTable = (props: { children: React.ReactNode }) => {
  return (
    <div className="max-w-2xl overflow-hidden bg-white shadow sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg font-medium leading-6 text-gray-900">
          User database
        </h3>
        <p className="max-w-2xl mt-1 text-sm text-gray-500">
          Details and informations about user.
        </p>
      </div>
      <div className="border-t border-gray-200">
        <dl>{props.children}</dl>
      </div>
    </div>
  );
};
