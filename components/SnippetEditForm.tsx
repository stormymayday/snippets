"use client";

import type { Snippet } from "@prisma/client";
import { useState } from "react";
import EditSnippetBtn from "./EditSnippetBtn";
import { updateSnippet } from "@/actions";

interface SnippetEditFormProps {
    snippet: Snippet;
}

function SnippetEditForm({ snippet }: SnippetEditFormProps) {
    const [title, setTitle] = useState(snippet.title);
    const [code, setCode] = useState(snippet.code);

    const updateSnippetAction = updateSnippet.bind(null, snippet.id);

    return (
        <form
            action={updateSnippetAction}
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

            <div className="flex flex-col gap-2">
                <label htmlFor="title">Code</label>
                <textarea
                    className="border p-2 rounded h-40"
                    name="code"
                    value={code}
                    onChange={(e) => {
                        setCode(e.target.value);
                    }}
                />
            </div>

            <EditSnippetBtn />
        </form>
    );
}
export default SnippetEditForm;
