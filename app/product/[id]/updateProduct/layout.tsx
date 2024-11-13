import { Metadata } from "next";
import { PropsWithChildren } from "react";

export const metadata: Metadata = {
    title: "Snap Cart / Update Product Page",
    description: "Snap Cart Update Product page",
  };

const UpdateProductPageLayout = ({ children }: PropsWithChildren) => {
  return <div>{children}</div>;
};

export default UpdateProductPageLayout;
