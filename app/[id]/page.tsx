import { db } from "@/db";
import { notFound } from "next/navigation";

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

    return (
        <div>
            <p>{snippet?.title}</p>
            <p>{snippet?.code}</p>
        </div>
    );
}
export default SnippetDetailsPage;
