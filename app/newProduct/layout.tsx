import { Metadata } from "next";
import { PropsWithChildren } from "react";

export const metadata: Metadata = {
    title: "Snap Cart / New Product Page",
    description: "Snap Cart New Product page",
  };

const NewProductPageLayout = ({ children }: PropsWithChildren) => {
  return <div>{children}</div>;
};

export default NewProductPageLayout;
