"use client";

interface ErrorPageProps {
    error: Error;
    reset: () => void;
}

function ErrorPage(props: ErrorPageProps) {
    console.error(props.error.message);

    return (
        <section className="h-[75vh] flex items-center justify-center">
            <h1 className="font-bold text-3xl text-center">
                Oops! Something went wrong!
            </h1>
        </section>
    );
}
export default ErrorPage;
