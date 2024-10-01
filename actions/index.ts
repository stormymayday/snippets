"use server";

import { db } from "@/db";
import { redirect } from "next/navigation";

export const createSnippet = async (formData: FormData) => {
    const title = formData.get("title") as string;
    const code = formData.get("code") as string;

    await db.snippet.create({
        data: {
            title,
            code,
        },
    });

    redirect("/");
};

export const deleteSnippet = async (id: string) => {
    await db.snippet.delete({
        where: { id },
    });

    redirect("/");
};

export const updateSnippet = async (id: string, formData: FormData) => {
    const title = formData.get("title") as string;
    const code = formData.get("code") as string;

    await db.snippet.update({
        where: {
            id,
        },
        data: {
            title,
            code,
        },
    });

    redirect("/");
};
