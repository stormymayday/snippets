"use client";

import type { Snippet } from "@prisma/client";
import { useState } from "react";
import EditSnippetBtn from "./EditSnippetBtn";
import { updateSnippet } from "@/actions";
import { Editor } from "@monaco-editor/react";
import { useFormState } from "react-dom";

interface SnippetEditFormProps {
    snippet: Snippet;
}

function SnippetEditForm({ snippet }: SnippetEditFormProps) {
    const [title, setTitle] = useState(snippet.title);
    const [code, setCode] = useState(snippet.code);

    const updateSnippetAction = updateSnippet.bind(null, snippet.id, code);

    const handleEditorChange = (value: string = "") => {
        setCode(value);
    };

    const [formState, action] = useFormState(updateSnippetAction, {
        message: "",
    });

    return (
        <form
            action={action}
            className="w-[100%] md:w-[60%] lg:w-[40%] p-6 rounded shadow flex flex-col gap-y-6"
        >
            <h3 className="font-bold m-3 text-center text-xl">Edit Snippet</h3>

            <div className="flex flex-col gap-2">
                <label htmlFor="title">Title</label>
                <input
                    className="border p-2 rounded"
                    type="text"
                    name="title"
                    value={title}
                    onChange={(e) => {
                        setTitle(e.target.value);
                    }}
                />
            </div>

            <div className="border-4 border-black rounded">
                <Editor
                    height="40vh"
                    theme="vs-dark"
                    language="javascript"
                    defaultValue={snippet.code}
                    options={{ minimap: { enabled: false } }}
                    onChange={handleEditorChange}
                />
            </div>

            {formState.message ? (
                <div className="my-2 p-2 bg-red-200 rounded text-center">
                    {formState.message}
                </div>
            ) : null}

            <EditSnippetBtn />
        </form>
    );
}
export default SnippetEditForm;
