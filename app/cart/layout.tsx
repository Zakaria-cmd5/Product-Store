import { Metadata } from "next";
import { PropsWithChildren } from "react";

export const metadata: Metadata = {
    title: "Snap Cart / Cart Page",
    description: "Snap Cart Cart page",
  };

const CartPageLayout = ({ children }: PropsWithChildren) => {
  return <div>{children}</div>;
};

export default CartPageLayout;
