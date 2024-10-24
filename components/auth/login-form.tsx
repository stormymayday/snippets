"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema } from "@/schemas";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";
import { Button } from "@/components/ui/button";
import CardWrapper from "@/components/auth/card-wrapper";
import FormError from "@/components/form-error";
import FromSuccess from "@/components/form-success";
import { login } from "@/actions";
import { useState, useTransition } from "react";
// import { Suspense } from "react";
import { useSearchParams } from "next/navigation";

function LoginForm() {
    const searchParams = useSearchParams();
    const urlError =
        searchParams.get("error") === "OAuthAccountNotLinked"
            ? "Another account already exists with the same e-mail address"
            : "";

    const [isPending, startTransition] = useTransition();
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");

    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    function onSubmit(values: z.infer<typeof LoginSchema>) {
        // Clearing error and success
        setError("");
        setSuccess("");

        // Pending State
        startTransition(async () => {
            try {
                setError("");
                setSuccess("");

                const data: { error?: string; success?: string } = await login(
                    values
                );

                setError(data?.error ?? "");
                setSuccess(data?.success ?? "");
            } catch (error) {
                setError("Something went wrong!");
            }
        });
    }

    return (
        <CardWrapper
            headerLabel="Welcome Back"
            backButtonLabel="Don't have and account?"
            backButtonHref="/auth/register"
            showSocial
        >
            <Form {...form}>
                <form
                    className="space-y-6"
                    onSubmit={form.handleSubmit(onSubmit)}
                >
                    <div className="space-y-4">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            // placeholder="john.doe@example.com"
                                            type="email"
                                            maxLength={50}
                                            disabled={isPending}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        {/* <Input
                                            {...field}
                                            type="password"
                                            disabled={isPending}
                                        /> */}
                                        <PasswordInput
                                            {...field}
                                            disabled={isPending}
                                            maxLength={20}
                                            // placeholder="password"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <FormError message={error || urlError} />
                    <FromSuccess message={success} />
                    <Button
                        className="min-w-full"
                        type="submit"
                        disabled={isPending}
                    >
                        {isPending ? "Logging in..." : "Login"}
                    </Button>
                </form>
            </Form>
        </CardWrapper>
    );
}

export default LoginForm;

// Alternative Suspense approach

// "use client";

// import * as z from "zod";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { LoginSchema } from "@/schemas";
// import {
//     Form,
//     FormControl,
//     FormField,
//     FormItem,
//     FormLabel,
//     FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { PasswordInput } from "@/components/ui/password-input";
// import { Button } from "@/components/ui/button";
// import CardWrapper from "@/components/auth/card-wrapper";
// import FormError from "@/components/form-error";
// import FromSuccess from "@/components/form-success";
// import { login } from "@/actions";
// import { useState, useTransition } from "react";
// import { Suspense } from "react";
// import { useSearchParams } from "next/navigation";

// function LoginForm() {
//     const [isPending, startTransition] = useTransition();
//     const [error, setError] = useState<string | undefined>("");
//     const [success, setSuccess] = useState<string | undefined>("");

//     const form = useForm<z.infer<typeof LoginSchema>>({
//         resolver: zodResolver(LoginSchema),
//         defaultValues: {
//             email: "",
//             password: "",
//         },
//     });

//     function onSubmit(values: z.infer<typeof LoginSchema>) {
//         setError("");
//         setSuccess("");

//         startTransition(async () => {
//             try {
//                 const data: { error?: string; success?: string } = await login(
//                     values
//                 );
//                 setError(data?.error ?? "");
//                 setSuccess(data?.success ?? "");
//             } catch (error) {
//                 setError("Something went wrong!");
//             }
//         });
//     }

//     return (
//         <Suspense fallback={<div>Loading...</div>}>
//             <LoginFormContent
//                 form={form}
//                 onSubmit={onSubmit}
//                 isPending={isPending}
//                 error={error}
//                 success={success}
//             />
//         </Suspense>
//     );
// }

// function LoginFormContent({
//     form,
//     onSubmit,
//     isPending,
//     error,
//     success,
// }: {
//     // eslint-disable-next-line @typescript-eslint/no-explicit-any
//     form: any;
//     onSubmit: (values: z.infer<typeof LoginSchema>) => void;
//     isPending: boolean;
//     error: string | undefined;
//     success: string | undefined;
// }) {
//     const searchParams = useSearchParams();
//     const urlError =
//         searchParams.get("error") === "OAuthAccountNotLinked"
//             ? "Email is already in use with a different provider!"
//             : "";

//     return (
//         <CardWrapper
//             headerLabel="Welcome Back"
//             backButtonLabel="Don't have an account?"
//             backButtonHref="/auth/register"
//             showSocial
//         >
//             <Form {...form}>
//                 <form
//                     className="space-y-6"
//                     onSubmit={form.handleSubmit(onSubmit)}
//                 >
//                     <div className="space-y-4">
//                         <FormField
//                             control={form.control}
//                             name="email"
//                             render={({ field }) => (
//                                 <FormItem>
//                                     <FormLabel>Email</FormLabel>
//                                     <FormControl>
//                                         <Input
//                                             {...field}
//                                             type="email"
//                                             maxLength={20}
//                                             disabled={isPending}
//                                         />
//                                     </FormControl>
//                                     <FormMessage />
//                                 </FormItem>
//                             )}
//                         />
//                         <FormField
//                             control={form.control}
//                             name="password"
//                             render={({ field }) => (
//                                 <FormItem>
//                                     <FormLabel>Password</FormLabel>
//                                     <FormControl>
//                                         <PasswordInput
//                                             {...field}
//                                             disabled={isPending}
//                                             maxLength={20}
//                                         />
//                                     </FormControl>
//                                     <FormMessage />
//                                 </FormItem>
//                             )}
//                         />
//                     </div>
//                     <FormError message={error || urlError} />
//                     <FromSuccess message={success} />
//                     <Button
//                         className="min-w-full"
//                         type="submit"
//                         disabled={isPending}
//                     >
//                         {isPending ? "Logging in..." : "Login"}
//                     </Button>
//                 </form>
//             </Form>
//         </CardWrapper>
//     );
// }

// export default LoginForm;
