"use client";

import { useSearchStore } from "@/providers/SearchStoreProvider";
import { Product } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import AddToCartButton from "./AddToCartButton";
import SearchInput from "./SearchInput";

interface Props {
  products: Product[];
}

const ProductList = ({ products }: Props) => {
  const searchTerm = useSearchStore((state) => state.searchTerm);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!filteredProducts)
    return (
      <p className="text-center text-lg font-semibold text-gray-500 p-4 bg-gray-100 rounded-lg shadow-md">
        There are no products yet
      </p>
    );

  return (
    <div className="flex flex-col items-center mt-10">
      <div className="w-full max-w-md mb-6">
        <SearchInput />
      </div>
      <div className="bg-gray-50 text-gray-800 p-4 w-full">
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <li
              key={product.id}
              className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg hover:scale-105 transition-all duration-200"
            >
              <Link href={`/product/${product.id}`} className="block">
                <div className="flex flex-col items-center">
                  <Image
                    src={product.image}
                    alt="Product Image"
                    width={70}
                    height={70}
                    className="object-cover rounded-full mb-3"
                  />
                  <p className="text-lg font-semibold text-center">
                    {product.name}
                  </p>
                  <p className="text-gray-500 text-sm text-center">{`$${product.price.toFixed(
                    2
                  )}`}</p>
                </div>
              </Link>
              <div className="mt-4 flex justify-center">
                <AddToCartButton productId={product.id} />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProductList;
