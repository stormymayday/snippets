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

    const deleteSnippetAction = deleteSnippet.bind(null, snippet?.id);

    return (
        <>
            <div className="flex justify-between items-center">
                <h2>{snippet.title}</h2>
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
            <div>
                <p>{snippet.code}</p>
            </div>
        </>
    );
}
export default SnippetDetailsPage;
