import { Stripe } from "@stripe/stripe-js";

interface Props {
  amount: number;
  userId: number | undefined;
  productId: number | undefined;
  stripe: Stripe;
  loading: boolean;
}

const PaymentButton = ({
  amount,
  loading,
  productId,
  stripe,
  userId,
}: Props) => {
  const handlePayment = async () => {
    try {
      const response = await fetch("/api/delete-cart-after-payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId, userId }),
      });

      const data = await response.json();

      if (response.ok) {
        // Redirect to success page or show success message
        window.location.href = `/payment-success?amount=${amount}`;
      } else {
        // Handle error response (e.g., show error message)
        console.error(data.error);
      }
    } catch (error) {
      console.error("Error during payment:", error);
    } finally {
    }
  };

  return (
    <button
      disabled={!stripe || loading}
      className="text-white w-full p-5 bg-black mt-2 rounded-md font-bold disabled:opacity-50 disabled:animate-pulse"
      onClick={handlePayment}
    >
      {!loading ? `Pay $${amount}` : "Processing..."}
    </button>
  );
};

export default PaymentButton;
