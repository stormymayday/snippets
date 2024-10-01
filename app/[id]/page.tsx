import { db } from "@/db";
import { notFound } from "next/navigation";
import Link from "next/link";
import { deleteSnippet } from "@/actions";

interface SnippetDetailsPageProps {
    params: {
        id: string;
    };
}

async function SnippetDetailsPage(props: SnippetDetailsPageProps) {
    const snippet = await db.snippet.findFirst({
        where: {
            id: props.params.id,
        },
    });

    if (!snippet) {
        return notFound();
    }

    const deleteSnippetAction = deleteSnippet.bind(null, snippet.id);

    return (
        <>
            <div className="flex justify-between items-center my-9">
                <h1 className="text-2xl font-bold">{snippet.title}</h1>
                <div className="flex gap-2">
                    <Link
                        className="bg-blue-500 p-2 px-4 rounded font-bold text-sm text-white"
                        href={`/${snippet.id}/edit`}
                    >
                        edit
                    </Link>
                    <form action={deleteSnippetAction}>
                        <button
                            className="bg-red-500 p-2 rounded font-bold text-sm text-white"
                            type="submit"
                        >
                            delete
                        </button>
                    </form>
                </div>
            </div>
            <pre className="h-[60vh] p-3 border rounded bg-gray-200">
                <code>{snippet.code}</code>
            </pre>
        </>
    );
}
export default SnippetDetailsPage;

export async function generateStaticParams() {
    const snippets = await db.snippet.findMany();

    return snippets.map((snippet) => {
        return {
            id: snippet.id,
        };
    });
}
