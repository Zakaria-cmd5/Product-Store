"use client";

import { addToCartAction } from "../actions/addToCartAction";

interface Props {
  productId: number;
}

const AddToCartButton = ({ productId }: Props) => {
  return (
    <button
      onClick={() => addToCartAction(productId)}
      className="bg-blue-600 text-white py-2 px-4 rounded-full text-sm font-semibold hover:bg-blue-700 transition-colors"
    >
      Add to Cart
    </button>
  );
};

export default AddToCartButton;
