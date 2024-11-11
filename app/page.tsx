import createAdminIfNotExist from "@/lib/seedHelper";
import ProductList from "./components/ProductList";

export default async function Home() {
  await createAdminIfNotExist();

  return (
    <div>
      <ProductList />
    </div>
  );
}
