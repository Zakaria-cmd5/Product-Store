import AddToCartButton from "@/components/AddToCartButton";
import { getCurrentUser } from "@/queries/getCurrentUser";
import { getProduct } from "@/queries/getProduct";
import { Role } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import DeleteProductButton from "./_components/DeleteProductButton";

interface Props {
  params: {
    id: string;
  };
}

const ProductDetailPage = async ({ params }: Props) => {
  const { id } = await params;

  if (!id) return notFound();

  const product = await getProduct(parseInt(id));

  if (!product) return null;

  const user = await getCurrentUser();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8 bg-amber-50 rounded-lg shadow-xl max-w-5xl mx-auto mt-10">
      <div className="space-y-4">
        <div className="relative w-full h-64 rounded-lg overflow-hidden shadow-lg">
          <Image
            src={product.image}
            alt="Product Image"
            layout="fill"
            objectFit="contain"
            className="rounded-lg bg-white bg-blend-screen"
          />
        </div>
        <h2 className="text-3xl font-bold text-gray-800">{product.name}</h2>
        <p className="text-gray-600">{product.description}</p>
        <p className="text-xl font-semibold text-amber-600">${product.price}</p>
      </div>
      <div className="flex flex-col gap-4">
        {user?.role === Role.ADMIN && (
          <>
            <DeleteProductButton productId={parseInt(id)} />
            <button className="bg-amber-600 text-white py-3 px-5 rounded-lg font-semibold hover:bg-amber-700 transition-colors duration-200 ease-in-out max-w-xs">
              <Link href={`/product/${id}/updateProduct`}>Update Product</Link>
            </button>
          </>
        )}
        {user?.id && <AddToCartButton productId={parseInt(id)} />}
      </div>
    </div>
  );
};

export default ProductDetailPage;
