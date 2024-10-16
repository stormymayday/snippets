import Link from "next/link";
import { db } from "@/db";

export default async function Home() {
    const snippets = await db.snippet.findMany();

    return (
        <section>
            <div className="flex justify-between items-center my-9">
                <h1 className="text-2xl font-bold">Snippets</h1>

                <Link
                    href="snippets/new"
                    className="bg-green-500 p-2 rounded text-white text-xs font-bold"
                >
                    Create New
                </Link>
            </div>

            <div className="flex flex-col gap-y-4">
                {snippets.length ? (
                    snippets.map((snippet) => (
                        <div
                            key={snippet.id}
                            className="flex justify-between items-center border rounded p-2"
                        >
                            <p>{snippet.title}</p>

                            <Link
                                href={`snippets/${snippet.id}`}
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
