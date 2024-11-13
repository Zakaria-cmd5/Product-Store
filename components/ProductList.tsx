"use client";

import { useSearchStore } from "@/providers/SearchStoreProvider";
import { Product, Role } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import AddToCartButton from "./AddToCartButton";
import SearchInput from "./SearchInput";

interface Props {
  products: Product[];
  userRole: string | undefined;
}

const ProductList = ({ products, userRole }: Props) => {
  const searchTerm = useSearchStore((state) => state.searchTerm);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!filteredProducts)
    return (
      <p className="text-center text-lg font-semibold text-indigo-700 p-6 bg-indigo-50 rounded-lg shadow-lg border border-indigo-100">
        There are no products yet
      </p>
    );

  return (
    <div className="flex flex-col items-center mt-10 space-y-8 px-4">
      <div className="w-full max-w-lg mb-6">
        <SearchInput />
      </div>
      <div className="bg-gray-50 text-gray-800 p-6 rounded-lg shadow-md w-full max-w-screen-lg">
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <li
              key={product.id}
              className="bg-white p-5 rounded-xl shadow-lg hover:shadow-2xl transform transition-transform duration-200 hover:-translate-y-1"
            >
              <Link href={`/product/${product.id}`} className="block">
                <div className="flex flex-col items-center">
                  <Image
                    src={product.image}
                    alt={`${product.name} Image`}
                    width={100}
                    height={100}
                    className="object-cover rounded-full mb-4 border-4 border-amber-100 shadow-sm"
                  />
                  <p className="text-lg font-semibold text-center text-gray-700">
                    {product.name}
                  </p>
                  <p className="text-gray-500 text-md text-center mt-1">
                    {`$${product.price.toFixed(2)}`}
                  </p>
                </div>
              </Link>
              <div className="mt-5 flex justify-center">
                {userRole === Role.USER && (
                  <AddToCartButton productId={product.id} />
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProductList;
