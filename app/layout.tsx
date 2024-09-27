import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "Snippets",
    description:
        "A Next JS application designed to create, read, update, and delete code snippets.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    );
}
