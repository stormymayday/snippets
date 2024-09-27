"use client";

import { useFormStatus } from "react-dom";

function CreateSnippetBtn() {
    const { pending } = useFormStatus();

    return (
        <button
            className="bg-blue-500 font-bold capitalize text-white p-2 rounded"
            type="submit"
            disabled={pending}
        >
            {pending ? "creating..." : "create"}
        </button>
    );
}
export default CreateSnippetBtn;
