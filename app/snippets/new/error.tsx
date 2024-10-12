"use client";

interface CreateSnippetErrorPageProps {
    error: Error;
    reset: () => void;
}

function CreateSnippetErrorPage(props: CreateSnippetErrorPageProps) {
    return (
        <section className="h-[75vh] flex items-center justify-center">
            <h1 className="font-bold text-3xl text-center">
                {props.error.message}
            </h1>
        </section>
    );
}
export default CreateSnippetErrorPage;
