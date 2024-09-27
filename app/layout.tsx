import type { Metadata } from "next";
import { Roboto } from "next/font/google";
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
            <body className={roboto.className}>{children}</body>
        </html>
    );
}
