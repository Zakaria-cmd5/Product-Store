"use client";

import axios from "axios";
import { useRouter } from "next/navigation";

interface Props {
  productId: number;
}

const DeleteProductButton = ({ productId }: Props) => {
  const router = useRouter();

  const deleteProductHandler = async () => {
    await axios.delete("/api/delete-product", {
      data: { productId },
    });

    router.push("/");
  };

  return (
    <button
      onClick={deleteProductHandler}
      className="bg-red-600 text-white py-3 px-5 rounded-lg font-semibold hover:bg-red-700 transition-colors max-w-xs"
    >
      Delete Product
    </button>
  );
};

export default DeleteProductButton;
