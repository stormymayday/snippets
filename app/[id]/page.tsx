import { db } from "@/db";

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

    return (
        <div>
            <p>{snippet?.title}</p>
            <p>{snippet?.code}</p>
        </div>
    );
}
export default SnippetDetailsPage;
