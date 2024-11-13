import { getAllCartItem } from "@/queries/getAllCartItem";
import Image from "next/image";
import CartItemsButtons from "./_components/CartItemsButtons";

const CartPage = async () => {
  const cartItems = await getAllCartItem();

  if(cartItems.length === 0) {
    return (
      <p className="text-center w-[50%] mx-auto text-lg font-semibold text-amber-700 p-6 bg-amber-50 rounded-lg shadow-lg border border-indigo-100">
        There are no Cart Item yet
      </p>
    )
  }

  return (
    <div className="bg-gray-50 text-gray-800 p-8">
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {cartItems.map((cartItem) => (
          <li
            key={cartItem.id}
            className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200"
          >
            <div className="flex flex-col items-center">
              <div className="relative w-28 h-28 rounded-full overflow-hidden shadow-md mb-4">
                <Image
                  src={cartItem.product.image}
                  alt="Product Image"
                  layout="fill"
                  objectFit="cover"
                  className="rounded-full"
                />
              </div>
              <p className="text-lg font-semibold text-center text-gray-800">
                {cartItem.product.name}
              </p>
              <p className="text-md font-semibold text-center text-gray-600">
                Quantity: {cartItem.quantity}
              </p>
              <p className="text-lg font-semibold text-center text-amber-600">
                Total: $
                {`${(cartItem.product.price * cartItem.quantity).toFixed(2)}`}
              </p>
            </div>
            <CartItemsButtons productId={cartItem.productId} cartItemId={cartItem.id}/>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CartPage;
