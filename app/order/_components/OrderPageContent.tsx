"use client";

import CheckoutPage from "@/components/CheckoutPage";
import convertToSubcurrency from "@/lib/convertToSubcurrency";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

if (process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY == undefined) {
  throw new Error("NEXT_PUBLIC_STRIPE_PUBLIC_KEY is not defined");
}

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

interface Props {
  userName: string | undefined;
  price: number;
  userId: number | undefined;
  productId: number | undefined
}

const OrderPageContent = ({ price, userName, productId, userId }: Props) => {
  return (
    <div className="max-w-6xl mx-auto p-10 text-white text-center border m-10 rounded-md bg-gradient-to-tr from-blue-500 to-purple-500">
      <div className="mb-10">
        <h1>{userName}</h1>
        <h2 className="text-2xl">Has requested</h2>
        <span className="font-bold">${price}</span>
      </div>

      <Elements
        stripe={stripePromise}
        options={{
          mode: "payment",
          amount: convertToSubcurrency(price),
          currency: "usd",
        }}
      >
        <CheckoutPage userId={userId} productId={productId} amount={price} />
      </Elements>
    </div>
  );
};

export default OrderPageContent;
