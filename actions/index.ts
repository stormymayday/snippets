"use server";

import { db } from "@/db";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export const createSnippet = async (
    code: string,
    formState: { message: string },
    formData: FormData
) => {
    try {
        const title = formData.get("title") as string;

        if (typeof title !== "string" || title.length < 3) {
            return {
                message: "Title must be longer",
            };
        }

        if (typeof code !== "string" || code.length < 3) {
            return {
                message: "Code must be longer",
            };
        }

        await db.snippet.create({
            data: {
                title,
                code,
            },
        });

        revalidatePath("/");
    } catch (error: unknown) {
        if (error instanceof Error) {
            return {
                message: error.message,
            };
        } else {
            return {
                message: "Oops! Something went wrong!",
            };
        }
    }

    redirect("/");
};

export const deleteSnippet = async (id: string) => {
    await db.snippet.delete({
        where: { id },
    });

    revalidatePath("/");
    redirect("/");
};

export const updateSnippet = async (
    id: string,
    code: string,
    formData: FormData
) => {
    const title = formData.get("title") as string;

    await db.snippet.update({
        where: {
            id,
        },
        data: {
            title,
            code,
        },
    });

    redirect(`/${id}`);
};
