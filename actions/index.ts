"use server";

import { db } from "@/db";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { AuthError } from "next-auth";
import * as z from "zod";
import { LoginSchema, RegisterSchema } from "@/schemas";
import bcrypt from "bcryptjs";
import { getUserByEmail } from "@/utils/user";
import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { generateVerificationToken } from "@/utils/tokens";
import { getVerificationTokenByToken } from "@/utils/verification-token";
import { sendVerificationEmail } from "@/utils/mail";
import { error } from "console";

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

    // Creating the user
    await db.user.create({
        data: {
            name,
            email,
            password: hashedPassword,
        },
    });

    // Generating Verification Token
    const verificationToken = await generateVerificationToken(email);

    // Sending verification token email
    await sendVerificationEmail(
        verificationToken.email,
        verificationToken.token,
        name
    );

    return { success: "Account created! Please verify your email!" };
};

export const login = async (values: z.infer<typeof LoginSchema>) => {
    const validatedFields = LoginSchema.safeParse(values);

    if (!validatedFields.success) {
        return {
            error: "Invalid fields!",
        };
    }

    const { email, password } = validatedFields.data;

    const existingUser = await getUserByEmail(email);

    if (!existingUser || !existingUser.email || !existingUser.password) {
        return { error: "Invalid credentials!" };
    }

    // Checking if email is verified
    if (!existingUser.emailVerified) {
        // Generating new Verification Token
        const verificationToken = await generateVerificationToken(
            existingUser.email
        );

        // Re-sending verification email
        await sendVerificationEmail(
            verificationToken.email,
            verificationToken.token,
            existingUser.name ? existingUser.name : "User"
        );

        return { error: "Please verify your email!" };
    }

    try {
        await signIn("credentials", {
            email,
            password,
            redirectTo: DEFAULT_LOGIN_REDIRECT,
        });

        return {
            success: "Login successful!",
        };
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                    return {
                        error: "Invalid credentials!",
                    };
                default:
                    return {
                        error: "Something went wrong!",
                    };
            }
        }
        throw error;
    }
};

export const newVerification = async (token: string) => {
    // Fetching existing token from db
    const existingToken = await getVerificationTokenByToken(token);

    // Checking if token exists
    if (!existingToken) {
        return {
            error: "Token does not exist",
        };
    }

    // Checking if token has expired
    const tokenExpired = new Date(existingToken.expires) < new Date();
    if (tokenExpired) {
        return { error: "Token has expired" };
    }

    // Fetching an existing user
    const existingUser = await getUserByEmail(existingToken.email);

    // Checking if the user exists
    if (!existingUser) {
        return { error: "Email does not exist" };
    }

    // Updating the user
    // Setting emailVerified to current date and email to the email from token
    await db.user.update({
        where: { id: existingUser.id },
        data: { emailVerified: new Date(), email: existingToken.email },
    });

    // Deleting existing token
    await db.verificationToken.delete({
        where: {
            id: existingToken.id,
        },
    });

    return { success: "Email verified!" };
};

export const createSnippet = async (
    code: string,
    userId: string,
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

        // Creating snippet and connecting it to the user
        await db.snippet.create({
            data: {
                title,
                code,
                user: {
                    // Connecting to user via userId
                    connect: { id: userId },
                },
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

        revalidatePath("/snippets");
        revalidatePath(`/snippets/${id}`);
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
    redirect(`/snippets/${id}`);
};
