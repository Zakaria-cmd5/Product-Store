import { getProduct } from "@/queries/getProduct";
import { notFound } from "next/navigation";
import UpdateProductForm from "./_components/UpdateProductForm";

interface Props {
  params: {
    id: string;
  };
}

const UpdateProductpage = async ({ params }: Props) => {
  const { id } = await params;

  if (!id) return notFound();

  const product = await getProduct(parseInt(id));

  if (!product) return null;

  const { name, description, price, image } = product;

  return (
    <UpdateProductForm
      id={parseInt(id)}
      name={name}
      description={description}
      price={price}
      image={image}
    />
  );
};

export default UpdateProductpage;
