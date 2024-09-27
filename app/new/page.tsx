import CreateSnippetBtn from "@/components/CreateSnippetBtn";
import { createSnippet } from "@/actions";

function CreateSnippetPage() {
    return (
        <div className="h-[80vh] flex items-center justify-center">
            <form
                action={createSnippet}
                className="w-[100%] md:w-[60%] lg:w-[40%] p-6 rounded shadow flex flex-col gap-y-6"
            >
                <h3 className="font-bold m-3 text-center text-xl">
                    Create a Snippet
                </h3>

                <div className="flex flex-col gap-2">
                    <label htmlFor="title" className="w-12">
                        Title
                    </label>
                    <input
                        className="border p-2 rounded w-full"
                        type="text"
                        name="title"
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <label htmlFor="title" className="w-12">
                        Code
                    </label>
                    <textarea
                        className="border p-2 rounded w-full h-40"
                        name="code"
                    />
                </div>
                <CreateSnippetBtn />
            </form>
        </div>
    );
}
export default CreateSnippetPage;
