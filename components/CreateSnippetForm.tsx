"use client";

import { createSnippet } from "@/actions";
import { useState } from "react";
import { Editor } from "@monaco-editor/react";
import CreateSnippetBtn from "./CreateSnippetBtn";

function CreateSnippetForm() {
    const [code, setCode] = useState("");

    const handleEditorChange = (value: string = "") => {
        setCode(value);
    };

    const createSnippetAction = createSnippet.bind(null, code);

    return (
        <form
            action={createSnippetAction}
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

            {/* <div className="flex flex-col gap-2">
                <label htmlFor="code">Code</label>
                <textarea className="border p-2 rounded h-40" name="code" />
            </div> */}

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

            <CreateSnippetBtn />
        </form>
    );
}
export default CreateSnippetForm;
