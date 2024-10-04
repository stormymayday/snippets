"use client";

import { createSnippet } from "@/actions";
import { useState } from "react";
import { Editor } from "@monaco-editor/react";
import CreateSnippetBtn from "./CreateSnippetBtn";
import { useFormState } from "react-dom";

function CreateSnippetForm() {
    const [code, setCode] = useState("");

    const handleEditorChange = (value: string = "") => {
        setCode(value);
    };

    const [formState, action] = useFormState(createSnippet.bind(null, code), {
        message: "",
    });

    return (
        <form
            action={action}
            className="w-[100%] md:w-[60%] lg:w-[40%] p-6 rounded shadow flex flex-col gap-y-6"
        >
            <h3 className="font-bold m-3 text-center text-xl">
                Create a Snippet
            </h3>

            <div className="flex flex-col gap-2">
                <label htmlFor="title">Title</label>
                <input
                    className="border p-2 rounded"
                    type="text"
                    name="title"
                />
            </div>

            <div className="border-4 border-black rounded">
                <Editor
                    height="40vh"
                    theme="vs-dark"
                    language="javascript"
                    value={code}
                    options={{ minimap: { enabled: false } }}
                    onChange={handleEditorChange}
                />
            </div>

            {formState.message ? (
                <div className="my-2 p-2 bg-red-200 rounded text-center">
                    {formState.message}
                </div>
            ) : null}

            <CreateSnippetBtn />
        </form>
    );
}
export default CreateSnippetForm;
