"use client";

import Link from "next/link";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { signupAction } from "../../actions/signupAction";
import FromErrorMessage from "../../components/FormErrorMessage";

const SignupPage = () => {
  const initState = { errors: {}, message: "" };
  const [formError, dispatch] = useActionState(signupAction, initState);
  const { pending: isLoading } = useFormStatus();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <form
        action={dispatch}
        className="flex flex-col bg-white p-8 rounded-lg shadow-md w-full max-w-md space-y-6"
      >
        <h2 className="text-2xl font-bold text-amber-600 text-center">
          Create an Account
        </h2>
        <input
          type="text"
          placeholder="Name"
          className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-amber-500 transition duration-200"
          name="userName"
        />
        <FromErrorMessage>
          {formError.errors?.userName?.join(", ")}
        </FromErrorMessage>
        <input
          type="email"
          placeholder="Email"
          className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-amber-500 transition duration-200"
          name="email"
        />
        <FromErrorMessage>
          {formError.errors?.email?.join(", ")}
        </FromErrorMessage>
        <input
          type="password"
          placeholder="Password"
          className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-amber-500 transition duration-200"
          name="password"
        />
        <FromErrorMessage>
          {formError.errors?.password?.join(", ")}
        </FromErrorMessage>
        <input
          type="password"
          placeholder="Re-Enter Password"
          className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-amber-500 transition duration-200"
          name="reEnterPassword"
        />
        <FromErrorMessage>
          {formError.errors?.reEnterPassword?.join(", ")}
        </FromErrorMessage>
        <FromErrorMessage>{formError.message}</FromErrorMessage>
        <button
          type="submit"
          className="w-full bg-amber-500 text-white font-semibold py-2 rounded-lg hover:bg-amber-600 transition duration-200"
          disabled={isLoading}
        >
          Sign Up
        </button>
        <p className="text-sm text-gray-500 text-center">
          Already have an account?{" "}
          <Link href="/login" className="text-amber-600 hover:underline">
            Log in
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SignupPage;
