import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const CartLoadingPage = () => {
    const cartItems = [1,2,3,4]

  return (
    <div className="bg-gray-50 text-gray-800 p-8">
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {cartItems.map((cartItem) => (
          <li
            key={cartItem}
            className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200"
          >
            <div className="flex flex-col items-center">
              <div className="relative w-28 h-28 rounded-full overflow-hidden shadow-md mb-4">
                <Skeleton className="rounded-full"/>
              </div>
              <Skeleton />
              <Skeleton />
              <Skeleton />
            </div>
            <div className="mt-6 flex justify-center">
              <Skeleton className="h-20 w-20"/>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CartLoadingPage;
