"use client";

import { updateProductAction } from "@/app/actions/updateProductAction";
import FromErrorMessage from "@/app/components/FormErrorMessage";
import { useActionState } from "react";

interface Props {
  id: number;
  name: string;
  description: string;
  image: string;
  price: number;
}

const UpdateProductForm = ({ id, name, description, image, price }: Props) => {
  const action = updateProductAction.bind(null, id);

  const initState = { errors: {}, message: "" };
  const [formError, dispatch, isLoading] = useActionState(action, initState);

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
          defaultValue={name || ""}
        />
        <FromErrorMessage>
          {formError.errors?.name?.join(", ")}
        </FromErrorMessage>
        <input
          type="text"
          placeholder="Description"
          className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-teal-500 transition duration-200"
          name="desc"
          defaultValue={description || ""}
        />
        <FromErrorMessage>
          {formError.errors?.description?.join(", ")}
        </FromErrorMessage>
        <input
          type="number"
          placeholder="Price"
          className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-teal-500 transition duration-200"
          name="price"
          defaultValue={price || 0}
        />
        <FromErrorMessage>
          {formError.errors?.price?.join(", ")}
        </FromErrorMessage>
        <input
          type="text"
          placeholder="image"
          className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-teal-500 transition duration-200"
          name="image"
          defaultValue={image || ""}
        />
        <FromErrorMessage>
          {formError.errors?.image?.join(", ")}
        </FromErrorMessage>
        <FromErrorMessage>{formError.message}</FromErrorMessage>
        <button
          type="submit"
          className="w-full bg-teal-500 text-white font-semibold py-2 rounded-lg hover:bg-teal-600 transition duration-200"
          disabled={isLoading}
        >
          Update
        </button>
      </form>
    </div>
  );
};

export default UpdateProductForm;
