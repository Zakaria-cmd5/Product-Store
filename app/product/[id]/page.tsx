import AddToCartButton from "@/app/components/AddToCartButton";
import { getProduct } from "@/queries/getProduct";
import Image from "next/image";
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

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8 bg-gray-50 rounded-lg shadow-lg max-w-5xl mx-auto mt-10">
      <div className="space-y-4">
        <div className="relative w-full h-64 rounded-lg overflow-hidden shadow-md">
          <Image
            src={product.image}
            alt="Product Image"
            layout="fill"
            objectFit="contain"
            className="rounded-lg bg-white bg-blend-screen"
          />
        </div>
        <h2 className="text-2xl font-bold text-gray-800">{product.name}</h2>
        <p className="text-gray-600">{product.description}</p>
        <p className="text-xl font-semibold text-teal-600">${product.price}</p>
      </div>
      <div className="flex flex-col gap-4">
        <DeleteProductButton productId={parseInt(id)} />
        <button className="bg-green-500 text-white py-3 px-5 rounded-lg font-semibold hover:bg-green-600 transition-colors max-w-xs">
          Update Product
        </button>
        <AddToCartButton productId={parseInt(id)} />
      </div>
    </div>
  );
};

export default ProductDetailPage;
