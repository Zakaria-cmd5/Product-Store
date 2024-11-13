import { Metadata } from "next";
import { PropsWithChildren } from "react";

export const metadata: Metadata = {
    title: "Snap Cart / Order Page",
    description: "Snap Cart Order page",
  };

const OrderPageLayout = ({ children }: PropsWithChildren) => {
  return <div>{children}</div>;
};

export default OrderPageLayout;
