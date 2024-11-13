"use client";

import { addToCartAction } from "../actions/addToCartAction";

interface Props {
  productId: number;
}

const AddToCartButton = ({ productId }: Props) => {
  return (
    <button
      onClick={() => addToCartAction(productId)}
      className="bg-amber-600 text-white py-3 px-5 rounded-lg font-semibold hover:bg-amber-700 transition-colors duration-200 ease-in-out max-w-xs"
    >
      Add to Cart
    </button>
  );
};

export default AddToCartButton;
