"use server";

import { db } from "@/db";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

import * as z from "zod";
import { LoginSchema, RegisterSchema } from "@/schemas";
import bcrypt from "bcrypt";
import { getUserByEmail } from "@/utils/user";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
    const validatedFields = RegisterSchema.safeParse(values);

    // Checking if the fields are valid
    if (!validatedFields.success) {
        return {
            error: "Invalid fields!",
        };
    }

    // Extracting validated fields
    const { email, password, name } = validatedFields.data;

    // Hashing the password (using salt rounds of 10)
    const hashedPassword = await bcrypt.hash(password, 10);

    // Confirming whether if the email is not taken
    const existingUser = await getUserByEmail(email);

    // Email is taken
    if (existingUser) {
        return {
            error: "Email already in use!",
        };
    }

    console.log("DB Client:", db);

    // Creating the user
    await db.user.create({
        data: {
            name,
            email,
            password: hashedPassword,
        },
    });

    // TODO: Send verification token email

    return { success: "User created!" };
};

export const login = async (values: z.infer<typeof LoginSchema>) => {
    const validatedFields = LoginSchema.safeParse(values);

    if (!validatedFields.success) {
        return {
            error: "Invalid fields!",
        };
    }

    return { success: "Email sent!" };
};

export const createSnippet = async (
    code: string,
    formState: { message: string },
    formData: FormData
) => {
    try {
        const title = formData.get("title");

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

        revalidatePath("/snippets");
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

    redirect("/snippets");
};

export const deleteSnippet = async (id: string) => {
    await db.snippet.delete({
        where: { id },
    });

    revalidatePath("/snippets");
    redirect("/snippets");
};

export const updateSnippet = async (
    id: string,
    code: string,
    formState: { message: string },
    formData: FormData
) => {
    try {
        const title = formData.get("title");

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

        await db.snippet.update({
            where: {
                id,
            },
            data: {
                title,
                code,
            },
        });

        revalidatePath("/");
        revalidatePath(`/${id}`);
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
    redirect(`/${id}`);
};
