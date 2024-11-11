import { getAllCartItem } from "@/queries/getAllCartItem";
import Image from "next/image";
import Link from "next/link";

const CartPage = async () => {
  const cartItems = await getAllCartItem();

  return (
    <div className="bg-gray-50 text-gray-800 p-4">
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {cartItems.map((cartItem) => (
          <li
            key={cartItem.id}
            className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg hover:scale-105 transition-all duration-200"
          >
            <div className="flex flex-col items-center">
              <Image
                src={cartItem.product.image}
                alt="Product Image"
                width={70}
                height={70}
                className="object-cover rounded-full mb-3"
              />
              <p className="text-lg font-semibold text-center">
                {cartItem.product.name}
              </p>
              <p className="text-lg font-semibold text-center">
                Quantity:{cartItem.quantity}
              </p>
              <p className="text-gray-500 text-sm text-center">
                Total: $
                {`${(cartItem.product.price * cartItem.quantity).toFixed(2)}`}
              </p>
            </div>
            <div className="mt-4 flex justify-center">
              <button className="bg-blue-600 text-white py-2 px-4 rounded-full text-sm font-semibold hover:bg-blue-700 transition-colors">
                <Link href="/order">Order now</Link>
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CartPage;
