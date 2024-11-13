import createAdminIfNotExist from "@/lib/seedHelper";
import { getAllProduct } from "@/queries/getAllProduct";
import { getCurrentUser } from "@/queries/getCurrentUser";
import ProductList from "../components/ProductList";

export default async function Home() {
  await createAdminIfNotExist();

  const products = await getAllProduct();

  const user = await getCurrentUser()

  return (
    <div>
      <ProductList products={products} userRole={user?.role}/>
    </div>
  );
}
