import { db } from "@/db";
import { notFound } from "next/navigation";
import SnippetEditForm from "@/components/SnippetEditForm";

interface EditSnippetPageProps {
    params: {
        id: string;
    };
}

async function EditSnippetPage(props: EditSnippetPageProps) {
    const snippet = await db.snippet.findFirst({
        where: {
            id: props.params.id,
        },
    });

    if (!snippet) {
        return notFound();
    }

    return (
        <section className="h-[80vh] flex items-center justify-center">
            <SnippetEditForm snippet={snippet} />
        </section>
    );
}
export default EditSnippetPage;
