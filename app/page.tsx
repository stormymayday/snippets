import Link from "next/link";
import { db } from "@/db";

export default async function Home() {
    const snippets = await db.snippet.findMany();

    return (
        <section>
            <div className="flex justify-between my-9">
                <h1>Home Page</h1>

                <Link
                    href="/new"
                    className="bg-green-500 p-2 rounded text-white text-xs font-bold"
                >
                    New
                </Link>
            </div>

            <div className="flex flex-col gap-y-4">
                {snippets.length ? (
                    snippets.map((snippet) => (
                        <div key={snippet.id} className="flex justify-between">
                            <p>{snippet.title}</p>

                            <Link
                                href={`/${snippet.id}`}
                                className="bg-blue-500 p-2 rounded text-white text-xs font-bold"
                            >
                                View
                            </Link>
                        </div>
                    ))
                ) : (
                    <p>no snippets found</p>
                )}
            </div>
        </section>
    );
}
