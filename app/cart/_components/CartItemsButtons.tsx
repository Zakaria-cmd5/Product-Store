'use client'

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface Props {
  productId: number | undefined;
  cartItemId: number | undefined
}

const CartItemsButtons = ({ productId, cartItemId }: Props) => {
    const router = useRouter();

  const handleCartItemDelete = async () => {
    await axios.delete("/api/delete-cart-item", {
      data: { productId, cartItemId },
    });
    router.refresh();
  };

  return (
    <div className="mt-6 flex gap-3 justify-center">
      <button className="bg-amber-600 text-white py-2 px-5 rounded-lg font-semibold hover:bg-amber-700 transition-colors">
        <Link href={`/order/${productId}`}>Order now</Link>
      </button>
      <button onClick={handleCartItemDelete} className="bg-rose-600 text-white py-2 px-5 rounded-lg font-semibold hover:bg-rose-800 transition-colors">
        Remove
      </button>
    </div>
  );
};

export default CartItemsButtons;
