import { getCurrentUser } from "@/queries/getCurrentUser";
import { getTheCartItemPrice } from "@/queries/getTheCartItemPrice";
import { notFound } from "next/navigation";
import OrderPageContent from "../_components/OrderPageContent";

interface Props {
  params: {
    id: string;
  };
}

const OrderPage = async ({ params }: Props) => {
  const { id } = await params;

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
