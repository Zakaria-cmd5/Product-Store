import { getProduct } from "@/queries/getProduct";
import { notFound } from "next/navigation";
import UpdateProductForm from "./_components/UpdateProductForm";

type Params = Promise<{ id: string }>;

const UpdateProductpage = async (props: { params: Params }) => {
  const params = await props.params;
  const id = params.id;

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
