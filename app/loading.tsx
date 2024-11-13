import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const HomePageLoading = () => {
  const skeletonProduct = [1, 2, 3, 4, 5, 6];

  return (
    <div className="flex flex-col items-center mt-10 space-y-8 px-4">
      <div className="w-full max-w-lg mb-6">
        <Skeleton className="w-40 h-40" />
      </div>
      <div className="bg-gray-50 text-gray-800 p-6 rounded-lg shadow-md w-full max-w-screen-lg">
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {skeletonProduct.map((product) => (
            <li
              key={product}
              className="bg-white p-5 rounded-xl shadow-lg hover:shadow-2xl transform transition-transform duration-200 hover:-translate-y-1"
            >
              <div className="flex flex-col items-center">
                <Skeleton className="rounded-full" />
                <p className="text-lg font-semibold text-center text-gray-700">
                  <Skeleton />
                </p>
                <p className="text-gray-500 text-md text-center mt-1">
                  <Skeleton />
                </p>
              </div>
              <div className="mt-5 flex justify-center">
                <Skeleton />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default HomePageLoading;
