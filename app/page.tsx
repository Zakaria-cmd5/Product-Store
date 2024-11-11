import createAdminIfNotExist from "@/lib/seedHelper";

export default async function Home() {
  await createAdminIfNotExist();

  return <div>Home page</div>;
}
