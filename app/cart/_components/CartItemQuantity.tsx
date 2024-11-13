"use client";

import axios from "axios";
import { useRouter } from "next/navigation";

interface Props {
  quantity: number;
  productId: number;
  cartItemId: number;
}

const CartItemQuantity = ({ quantity, cartItemId, productId }: Props) => {
  const router = useRouter();

  const decrementQuantityHandler = async () => {
    await axios.post("/api/increment-decrement-quantity", {
      quantity,
      type: "decrement",
      productId,
      cartItemId,
    });

    router.refresh();
  };

  const incrementQuantityHandler = async () => {
    await axios.post("/api/increment-decrement-quantity", {
      quantity,
      type: "increment",
      productId,
      cartItemId,
    });

    router.refresh();
  };

  return (
    <div className="flex justify-center items-center gap-4">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="size-6 text-rose-500"
        onClick={decrementQuantityHandler}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
      </svg>
      <p className="text-md font-semibold text-center text-gray-600">
        Quantity: {quantity}
      </p>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="size-6 text-green-600"
        onClick={incrementQuantityHandler}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 4.5v15m7.5-7.5h-15"
        />
      </svg>
    </div>
  );
};

export default CartItemQuantity;
