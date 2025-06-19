const Unauthorized = () => {
  return (
    <div className="flex justify-center items-center min-h-[80vh] px-4">
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6 text-center">
        <h2 className="text-2xl font-bold text-red-600 mb-4">Access Denied</h2>
        <p className="text-gray-700">
          You do not have permission to view this page.
        </p>
      </div>
    </div>
  );
};

export default Unauthorized;
