"use client";

import { useActionState } from "react";
import { newProductAction } from "../actions/newProductAction";
import FromErrorMessage from "../components/FormErrorMessage";

const NewProductPage = () => {
  const initState = { errors: {}, message: "" };
  const [formError, dispatch] = useActionState(newProductAction, initState);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <form
        action={dispatch}
        className="flex flex-col bg-white p-8 rounded-lg shadow-md w-full max-w-md space-y-6"
      >
        <h2 className="text-2xl font-bold text-teal-600 text-center">
          Create New Product
        </h2>
        <input
          type="text"
          placeholder="Name"
          className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-teal-500 transition duration-200"
          name="name"
        />
        <FromErrorMessage>
          {formError.errors?.name?.join(", ")}
        </FromErrorMessage>
        <input
          type="text"
          placeholder="Description"
          className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-teal-500 transition duration-200"
          name="desc"
        />
        <FromErrorMessage>
          {formError.errors?.description?.join(", ")}
        </FromErrorMessage>
        <input
          type="number"
          placeholder="Price"
          className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-teal-500 transition duration-200"
          name="price"
        />
        <FromErrorMessage>
          {formError.errors?.price?.join(", ")}
        </FromErrorMessage>
        <input
          type="text"
          placeholder="image"
          className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-teal-500 transition duration-200"
          name="image"
        />
        <FromErrorMessage>
          {formError.errors?.image?.join(", ")}
        </FromErrorMessage>
        <FromErrorMessage>{formError.message}</FromErrorMessage>
        <button
          type="submit"
          className="w-full bg-teal-500 text-white font-semibold py-2 rounded-lg hover:bg-teal-600 transition duration-200"
          //   disabled={isLoading}
        >
          Create
        </button>
      </form>
    </div>
  );
};

export default NewProductPage;
