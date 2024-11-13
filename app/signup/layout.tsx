import { Metadata } from "next";
import { PropsWithChildren } from "react";

export const metadata: Metadata = {
  title: "Snap Cart / Signup Page",
  description: "Snap Cart Signup page",
};

const SignupPageLayout = ({ children }: PropsWithChildren) => {
  return <div>{children}</div>;
};

export default SignupPageLayout;
