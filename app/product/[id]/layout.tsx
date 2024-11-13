import { Metadata } from "next";
import { PropsWithChildren } from "react";

export const metadata: Metadata = {
    title: "Snap Cart / Product Detail Page",
    description: "Snap Cart Product Detail page",
  };

const ProductDetailPageLayout = ({ children }: PropsWithChildren) => {
  return <div>{children}</div>;
};

export default ProductDetailPageLayout;
