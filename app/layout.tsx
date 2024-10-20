import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import Navbar from "@/components/Navbar";
import "./globals.css";

export const metadata: Metadata = {
    title: "Snippets",
    description:
        "A Next JS application designed to create, read, update, and delete code snippets.",
};

const roboto = Roboto({
    subsets: ["latin"],
    weight: ["400", "700"],
});

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            {/* <body className={roboto.className}> */}
            <body className="max-w-screen-2xl m-auto px-12">
                {/* <Navbar /> */}
                {children}
            </body>
        </html>
    );
}
