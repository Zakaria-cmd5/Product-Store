import { Metadata } from "next";
import { PropsWithChildren } from "react";

export const metadata: Metadata = {
    title: "Snap Cart / Payment Success Page",
    description: "Snap Cart Payment Success page",
  };

const PaymentSuccessPageLayout = ({ children }: PropsWithChildren) => {
  return <div>{children}</div>;
};

export default PaymentSuccessPageLayout;
