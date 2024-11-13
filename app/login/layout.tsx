import { Metadata } from "next";
import { PropsWithChildren } from "react";

export const metadata: Metadata = {
  title: "Snap Cart / Login Page",
  description: "Snap Cart Login Page",
};

const LoginPageLayout = ({ children }: PropsWithChildren) => {
  return <div>{children}</div>;
};

export default LoginPageLayout;
