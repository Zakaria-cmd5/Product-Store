import createAdminIfNotExist from "@/lib/seedHelper";
import { getAllProduct } from "@/queries/getAllProduct";
import ProductList from "./components/ProductList";

export default async function Home() {
  await createAdminIfNotExist();

  const products = await getAllProduct();

  return (
    <div>
      <ProductList products={products} />
    </div>
  );
}
