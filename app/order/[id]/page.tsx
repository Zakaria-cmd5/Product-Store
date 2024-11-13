import { getCurrentUser } from "@/queries/getCurrentUser";
import { getTheCartItemPrice } from "@/queries/getTheCartItemPrice";
import { notFound } from "next/navigation";
import OrderPageContent from "../_components/OrderPageContent";

type Params = Promise<{ id: string }>;

const OrderPage = async (props: { params: Params }) => {
  const params = await props.params;
  const id = params.id;

  if (!id) return notFound();

  const user = await getCurrentUser();

  if (!user) return null;

  const price = await getTheCartItemPrice(parseInt(id), user?.id);

  return (
    <OrderPageContent
      userId={user.id}
      productId={parseInt(id)}
      userName={user?.name}
      price={price!}
    />
  );
};

export default OrderPage;
